import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'
import { customTints, initialContributions } from '../data/contributions'
import type { Contribution } from '../types'

const COLLECTION = 'contributions'
const STORAGE_KEY = 'kidush.contributions.v2'

export interface ContributionsRepo {
  /** האזנה רציפה לרשימה. מחזירה פונקציית ניתוק. */
  subscribe(
    onData: (items: Contribution[]) => void,
    onError: (error: unknown) => void,
  ): () => void
  /** רישום משפחה לפריט קיים */
  register(contributionId: string, familyName: string): Promise<void>
  /** ביטול רישום של משפחה */
  unregister(contributionId: string, familyName: string): Promise<void>
  /** הוספת פריט שאינו ברשימה, משויך למשפחה שהוסיפה אותו */
  addCustom(title: string, familyName: string): Promise<void>
  /**
   * איפוס: כל השיוכים למשפחות נמחקים והפריטים שנוספו ידנית יורדים מהרשימה.
   * התוצאה היא רשימת הפריטים המקורית ללא שיוך לאף אחד.
   */
  reset(): Promise<void>
}

function makeCustom(title: string, familyName: string, index: number): Contribution {
  return {
    id: `custom-${Date.now()}-${index}`,
    title,
    icon: 'dish',
    tint: customTints[index % customTints.length],
    quantityRequired: 1,
    registeredFamilies: [familyName],
    isCustom: true,
    order: 1000 + index,
  }
}

/* ------------------------------------------------------------------ */
/* מימוש מקומי — פועל ללא שרת, שומר ב-localStorage                     */
/* ------------------------------------------------------------------ */

function createLocalRepo(): ContributionsRepo {
  const read = (): Contribution[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as Contribution[]
    } catch {
      /* אחסון חסום בדפדפן — נופלים חזרה לנתוני הבסיס */
    }
    return initialContributions
  }

  let items = read()
  const listeners = new Set<(items: Contribution[]) => void>()

  const emit = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* אחסון חסום — ממשיכים בזיכרון בלבד */
    }
    listeners.forEach((fn) => fn(items))
  }

  return {
    subscribe(onData) {
      listeners.add(onData)
      // דמוי טעינה אסינכרונית כדי שמצב הטעינה יתנהג זהה בשני המימושים
      const t = setTimeout(() => onData(items), 220)
      return () => {
        clearTimeout(t)
        listeners.delete(onData)
      }
    },

    async register(id, familyName) {
      const target = items.find((c) => c.id === id)
      if (!target) throw { code: 'not-found' }
      if (target.registeredFamilies.includes(familyName)) throw { code: 'already-exists' }
      if (target.registeredFamilies.length >= target.quantityRequired) {
        throw { code: 'failed-precondition' }
      }
      items = items.map((c) =>
        c.id === id ? { ...c, registeredFamilies: [...c.registeredFamilies, familyName] } : c,
      )
      emit()
    },

    async unregister(id, familyName) {
      items = items.map((c) =>
        c.id === id
          ? { ...c, registeredFamilies: c.registeredFamilies.filter((f) => f !== familyName) }
          : c,
      )
      emit()
    },

    async addCustom(title, familyName) {
      if (items.some((c) => c.title.trim() === title.trim())) throw { code: 'already-exists' }
      items = [...items, makeCustom(title, familyName, items.length)]
      emit()
    },

    async reset() {
      items = initialContributions.map((c) => ({ ...c, registeredFamilies: [] }))
      emit()
    },
  }
}

/* ------------------------------------------------------------------ */
/* מימוש Firestore                                                     */
/* ------------------------------------------------------------------ */

function createFirestoreRepo(): ContributionsRepo {
  const store = db!
  const col = collection(store, COLLECTION)

  /** זריעה חד-פעמית של רשימת הפריטים אם האוסף ריק */
  async function seedIfEmpty() {
    const snap = await getDocs(col)
    if (!snap.empty) return
    const batch = writeBatch(store)
    initialContributions.forEach((item, index) => {
      batch.set(doc(store, COLLECTION, item.id), { ...item, order: index })
    })
    await batch.commit()
  }

  return {
    subscribe(onData, onError) {
      let active = true
      seedIfEmpty().catch(onError)

      const unsub = onSnapshot(
        query(col, orderBy('order')),
        (snap) => {
          if (!active) return
          onData(
            snap.docs.map((d) => {
              const data = d.data() as Omit<Contribution, 'id'>
              return {
                id: d.id,
                title: data.title,
                icon: data.icon,
                tint: data.tint,
                quantityRequired: data.quantityRequired,
                registeredFamilies: data.registeredFamilies ?? [],
                isCustom: data.isCustom ?? false,
                order: data.order,
              }
            }),
          )
        },
        onError,
      )

      return () => {
        active = false
        unsub()
      }
    },

    async register(id, familyName) {
      const ref = doc(store, COLLECTION, id)
      // טרנזקציה מונעת מצב שבו שתי משפחות תופסות את המקום האחרון בו-זמנית
      await runTransaction(store, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) throw { code: 'not-found' }
        const data = snap.data() as Contribution
        const families = data.registeredFamilies ?? []
        if (families.includes(familyName)) throw { code: 'already-exists' }
        if (families.length >= data.quantityRequired) throw { code: 'failed-precondition' }
        tx.update(ref, { registeredFamilies: [...families, familyName] })
      })
    },

    async unregister(id, familyName) {
      const ref = doc(store, COLLECTION, id)
      await runTransaction(store, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) throw { code: 'not-found' }
        const data = snap.data() as Contribution
        tx.update(ref, {
          registeredFamilies: (data.registeredFamilies ?? []).filter((f) => f !== familyName),
        })
      })
    },

    async addCustom(title, familyName) {
      const snap = await getDocs(col)
      if (snap.docs.some((d) => (d.data().title as string)?.trim() === title.trim())) {
        throw { code: 'already-exists' }
      }
      const item = makeCustom(title, familyName, snap.size)
      await setDoc(doc(store, COLLECTION, item.id), item)
    },

    async reset() {
      const snap = await getDocs(col)
      // הפריטים שנוספו ידנית נמחקים; השאר חוזרים לרשימה נקייה משיוכים
      await Promise.all(
        snap.docs.filter((d) => d.data().isCustom === true).map((d) => deleteDoc(d.ref)),
      )
      const batch = writeBatch(store)
      initialContributions.forEach((item, index) => {
        batch.set(doc(store, COLLECTION, item.id), { ...item, registeredFamilies: [], order: index })
      })
      await batch.commit()
    },
  }
}

export const contributionsRepo: ContributionsRepo =
  isFirebaseConfigured && db ? createFirestoreRepo() : createLocalRepo()

export const dataSource: 'firebase' | 'local' = isFirebaseConfigured && db ? 'firebase' : 'local'
