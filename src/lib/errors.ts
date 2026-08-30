/**
 * תרגום שגיאות טכניות להודעות בעברית.
 * שגיאות גולמיות של Firebase / JavaScript לעולם אינן מוצגות למשתמש.
 */
const messages: Record<string, string> = {
  'permission-denied': 'אין הרשאה לבצע פעולה זו',
  unauthenticated: 'יש להתחבר מחדש כדי להמשיך',
  unavailable: 'אין כרגע חיבור לשרת. בדקו את החיבור לאינטרנט ונסו שוב.',
  'deadline-exceeded': 'הפעולה ארכה זמן רב מדי. נסו שוב.',
  'not-found': 'הפריט המבוקש לא נמצא',
  'already-exists': 'הפריט כבר קיים ברשימה',
  'resource-exhausted': 'המערכת עמוסה כרגע. נסו שוב בעוד מספר רגעים.',
  'failed-precondition': 'לא ניתן לבצע את הפעולה במצב הנוכחי',
  aborted: 'הפעולה בוטלה. נסו שוב.',
  cancelled: 'הפעולה בוטלה',
  internal: 'משהו השתבש. נסו שוב.',
}

export const GENERIC_ERROR = 'משהו השתבש. נסו שוב.'

export function toHebrewError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const raw = String((error as { code: unknown }).code)
    const key = raw.includes('/') ? raw.split('/')[1] : raw
    if (messages[key]) return messages[key]
  }
  if (error instanceof TypeError) {
    return 'אין כרגע חיבור לשרת. בדקו את החיבור לאינטרנט ונסו שוב.'
  }
  return GENERIC_ERROR
}
