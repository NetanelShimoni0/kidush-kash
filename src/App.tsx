import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { Hero } from './components/Hero'
import { ContributionPanel } from './components/ContributionPanel'
import { RegistrationDialog } from './components/RegistrationDialog'
import { OthersDialog } from './components/OthersDialog'
import { NotificationsSheet, type AppNotification } from './components/NotificationsSheet'
import { MenuDrawer } from './components/MenuDrawer'
import { AboutDialog } from './components/AboutDialog'
import { Toast, type ToastMessage } from './components/Toast'
import { contributionsRepo, dataSource } from './lib/contributionsRepo'
import { toHebrewError } from './lib/errors'
import type { Contribution } from './types'
import './App.css'

const initialNotifications: AppNotification[] = [
  { id: 'n1', title: 'משפחת לוי נרשמה להביא עוגות', time: 'לפני 12 דקות', read: false },
  { id: 'n2', title: 'נותרו 2 מקומות בקטגוריית מאפים מתוקים', time: 'לפני שעה', read: false },
  { id: 'n3', title: 'הקידוש הקרוב יתקיים בשבת בשעה 11:15', time: 'אתמול', read: false },
]

type DialogState =
  | { kind: 'none' }
  | { kind: 'item'; item: Contribution }
  | { kind: 'others' }
  | { kind: 'notifications' }
  | { kind: 'menu' }
  | { kind: 'about' }

export default function App() {
  const [items, setItems] = useState<Contribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dialog, setDialog] = useState<DialogState>({ kind: 'none' })
  const [notifications, setNotifications] = useState(initialNotifications)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const toastId = useRef(0)

  const showToast = useCallback((text: string, tone: ToastMessage['tone']) => {
    toastId.current += 1
    setToast({ id: toastId.current, text, tone })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setErrorMessage(null)

    const unsubscribe = contributionsRepo.subscribe(
      (next) => {
        setItems(next)
        setIsLoading(false)
      },
      (error) => {
        setErrorMessage(toHebrewError(error))
        setIsLoading(false)
      },
    )

    return unsubscribe
  }, [reloadKey])

  /* החלונית הפתוחה מתעדכנת בזמן אמת כשהנתונים משתנים */
  const openItem = useMemo(() => {
    if (dialog.kind !== 'item') return null
    return items.find((c) => c.id === dialog.item.id) ?? dialog.item
  }, [dialog, items])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleRegister = useCallback(
    async (id: string, familyName: string) => {
      try {
        await contributionsRepo.register(id, familyName)
        showToast(`${familyName} נרשמה בהצלחה. תודה!`, 'success')
      } catch (error) {
        const message = toHebrewError(error)
        showToast(message, 'error')
        throw new Error(message)
      }
    },
    [showToast],
  )

  const handleUnregister = useCallback(
    async (id: string, familyName: string) => {
      try {
        await contributionsRepo.unregister(id, familyName)
        showToast(`ההרשמה של ${familyName} בוטלה`, 'success')
      } catch (error) {
        showToast(toHebrewError(error), 'error')
      }
    },
    [showToast],
  )

  const closeDialog = useCallback(() => setDialog({ kind: 'none' }), [])

  const handleNavigate = useCallback((target: 'list' | 'families' | 'about') => {
    if (target === 'families') {
      setDialog({ kind: 'others' })
      return
    }
    if (target === 'about') {
      setDialog({ kind: 'about' })
      return
    }
    setDialog({ kind: 'none' })
    document.getElementById('list')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const dataSourceLabel =
    dataSource === 'firebase'
      ? 'הנתונים מסונכרנים בזמן אמת מול השרת.'
      : 'הנתונים נשמרים כרגע במכשיר שלכם בלבד. לאחר חיבור לשרת הם יסונכרנו בין כל המשפחות.'

  return (
    <div className="app" dir="rtl">
      <AppHeader
        notificationCount={unreadCount}
        onOpenNotifications={() => setDialog({ kind: 'notifications' })}
        onOpenMenu={() => setDialog({ kind: 'menu' })}
        onNavigate={handleNavigate}
      />

      <main className="app__main">
        <Hero />
        <ContributionPanel
          items={items}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onOpenItem={(item) => setDialog({ kind: 'item', item })}
          onOpenOther={() => setDialog({ kind: 'others' })}
          onRetry={() => setReloadKey((k) => k + 1)}
        />
      </main>

      <footer className="app__footer">
        <p className="app__footer-title">שבת שלום ומבורכת</p>
        <p className="app__footer-text">תודה לכל המשפחות שלוקחות חלק בהכנת הקידוש.</p>
      </footer>

      <RegistrationDialog
        item={openItem}
        onClose={closeDialog}
        onRegister={handleRegister}
        onUnregister={handleUnregister}
      />

      <OthersDialog open={dialog.kind === 'others'} items={items} onClose={closeDialog} />

      <NotificationsSheet
        open={dialog.kind === 'notifications'}
        notifications={notifications}
        onClose={closeDialog}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
      />

      <MenuDrawer
        open={dialog.kind === 'menu'}
        onClose={closeDialog}
        onNavigate={handleNavigate}
        dataSourceLabel={dataSourceLabel}
      />

      <AboutDialog open={dialog.kind === 'about'} onClose={closeDialog} />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
