# קידוש משותף, באופן מתוק

מערכת מתנדבים לקידוש — כל משפחה בוחרת מה להביא ורושמת את עצמה.
ממשק בעברית מלאה, RTL מקצה לקצה, מותאם למובייל ולמחשב.

בנוי מתוך עיצוב ייחוס ויזואלי ב-React + TypeScript + Vite, עם Firestore כמקור נתונים.

---

## הרצה מקומית

```bash
npm install
npm run dev
```

האפליקציה עולה בכתובת `http://localhost:5173`.

היא פועלת מיד גם **ללא Firebase** — במצב הזה הנתונים נשמרים ב-`localStorage`
של הדפדפן. ברגע שמשתני הסביבה של Firebase קיימים, המערכת עוברת אוטומטית
לעבודה מול Firestore בזמן אמת.

## פקודות

| פקודה | תיאור |
| --- | --- |
| `npm run dev` | שרת פיתוח |
| `npm run build` | בנייה לייצור (`dist/`) |
| `npm run preview` | תצוגה מקדימה של הבנייה |
| `npm run typecheck` | בדיקת טיפוסים |
| `npm run audit:rtl` | אודיט עברית/RTL — נכשל אם יש טקסט באנגלית בממשק |
| `npm run verify` | כל הבדיקות ברצף |

---

## חיבור Firebase (תוכנית Spark – חינם)

1. פתחו פרויקט חדש ב-[Firebase Console](https://console.firebase.google.com).
2. **Build → Firestore Database → Create database** במצב Production.
3. **Project settings → General → Your apps → Web (`</>`)** — צרו אפליקציית Web
   והעתיקו את אובייקט ה-config.
4. צרו קובץ `.env.local` לפי `.env.example` ומלאו את הערכים.
5. פרסמו את חוקי האבטחה:

```bash
npx firebase-tools login
npx firebase-tools use --add          # בחרו את הפרויקט שיצרתם
npx firebase-tools deploy --only firestore:rules
```

באתחול הראשון, אם אוסף `contributions` ריק, האפליקציה זורעת אותו אוטומטית
ברשימת הפריטים מהעיצוב.

### חוקי האבטחה

`firestore.rules` מגדיר:

- קריאה פתוחה לכולם (הרשימה ציבורית לקהילה).
- כתיבה מוגבלת לשדה `registeredFamilies` בלבד.
- מספר המשפחות הרשומות לעולם לא יעבור את `quantityRequired`.
- מחיקה חסומה לחלוטין.

> אין בפרויקט שכבת הזדהות. אם תרצו להגביל את הרישום למתפללי בית הכנסת בלבד,
> יש להוסיף Firebase Auth ולעדכן את החוקים בהתאם.

---

## פריסה ל-Vercel

**דרך א׳ — חיבור הרפוזיטורי (מומלץ):**

1. [vercel.com/new](https://vercel.com/new) → Import של הרפוזיטורי.
2. Vercel מזהה Vite אוטומטית (`vercel.json` כבר בפרויקט).
3. **Settings → Environment Variables** — הוסיפו את ששת משתני
   `VITE_FIREBASE_*` לסביבות Production, Preview ו-Development.
4. Deploy. כל push ל-`main` יפרוס אוטומטית.

**דרך ב׳ — פריסה דרך GitHub Actions:**

הוסיפו ב-**GitHub → Settings → Secrets and variables → Actions** את הסודות:

| Secret | מאיפה |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` אחרי `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` אחרי `vercel link` |
| `VITE_FIREBASE_*` | אובייקט ה-config של Firebase |

`.github/workflows/deploy.yml` מדלג על הפריסה בשקט כל עוד הסודות חסרים,
כך שה-CI לעולם לא נכשל בגללם.

---

## CI

`.github/workflows/ci.yml` רץ על כל push ו-PR ל-`main`:

- **Typecheck & build** — `tsc --noEmit` ובנייה מלאה.
- **Hebrew / RTL audit** — מוודא ש-`index.html` נושא `lang="he"` ו-`dir="rtl"`,
  ש-`direction: rtl` נאכף ב-CSS, ושאין טקסט באנגלית בממשק.

---

## מבנה הפרויקט

```
src/
├─ components/
│  ├─ AppHeader.tsx         כותרת עליונה: פעמון עם מונה + תפריט
│  ├─ Hero.tsx              אזור הפתיחה + קישוטים וקטוריים
│  ├─ HeroDecor.tsx         סוכריות, קאפקייק וגביע קידוש (SVG)
│  ├─ ContributionPanel.tsx פאנל "מה מביאים?" + מצבי טעינה/שגיאה/ריק
│  ├─ ContributionRow.tsx   כרטיס פריט בודד
│  ├─ Modal.tsx             בסיס לחלוניות ומגירות (מלכודת פוקוס, Esc)
│  ├─ RegistrationDialog.tsx
│  ├─ OthersDialog.tsx
│  ├─ NotificationsSheet.tsx
│  ├─ MenuDrawer.tsx
│  ├─ AboutDialog.tsx
│  ├─ Toast.tsx
│  └─ icons/                אייקוני מזון וממשק (SVG פנימיים)
├─ lib/
│  ├─ firebase.ts           אתחול מותנה לפי משתני סביבה
│  ├─ contributionsRepo.ts  Firestore + נפילה חזרה לאחסון מקומי
│  └─ errors.ts             תרגום שגיאות טכניות לעברית
├─ data/contributions.ts    רשימת הפריטים מהעיצוב
└─ styles/
   ├─ tokens.css            טוקנים שחולצו מהעיצוב
   └─ global.css            איפוס + אכיפת RTL
```

---

## עברית ו-RTL

- `<html lang="he" dir="rtl">` ב-`index.html`, ונאכף שוב ב-`main.tsx`.
- `direction: rtl` על `html`, `body`, `#root` ועל מכולת האפליקציה.
- מונים כמו `2/4` עטופים ב-`.ltr-num` כדי שלא יתהפכו.
- פסי ההתקדמות מתמלאים **מימין לשמאל**.
- המגירה נפתחת מהצד הימני; כפתור הסגירה בקצה השמאלי.
- הצ׳בון מצביע שמאלה — כיוון ה"קדימה" בממשק RTL.
- כל שגיאה טכנית מתורגמת לעברית לפני שהיא מוצגת (`src/lib/errors.ts`).
