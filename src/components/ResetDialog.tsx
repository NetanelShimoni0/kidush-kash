import { useEffect, useState } from 'react'
import { Modal } from './Modal'

/*
  הסיסמה נבדקת בצד הלקוח בלבד ולכן היא חסם נוחות, לא אבטחה:
  מי שפותח את קוד המקור בדפדפן יוכל לראות אותה.
  להגנה אמיתית יש להעביר את האיפוס לפונקציית שרת עם הזדהות.
*/
const RESET_PASSWORD = 'שמעוני'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function ResetDialog({ open, onClose, onConfirm }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    if (open) return
    setPassword('')
    setError(null)
    setIsResetting(false)
  }, [open])

  const submit = async () => {
    if (password.trim() !== RESET_PASSWORD) {
      setError('הסיסמה שגויה')
      return
    }
    setIsResetting(true)
    setError(null)
    try {
      await onConfirm()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setIsResetting(false)
    }
  }

  return (
    <Modal
      open={open}
      title="איפוס הרשימה"
      subtitle="כל ההרשמות יימחקו והרשימה תחזור לפריטים בלבד, ללא שיוך למשפחות."
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            className="btn btn--primary"
            onClick={submit}
            disabled={isResetting}
          >
            {isResetting ? 'מאפס...' : 'איפוס'}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            ביטול
          </button>
        </>
      }
    >
      <p className="reset-warning">
        הפעולה אינה הפיכה. גם פריטים שמשפחות הוסיפו דרך &quot;אחר&quot; יימחקו מהרשימה.
      </p>

      <div className="field">
        <label className="field__label" htmlFor="reset-password">
          סיסמת מנהל
        </label>
        <input
          id="reset-password"
          className={`field__input${error ? ' field__input--invalid' : ''}`}
          type="password"
          dir="rtl"
          placeholder="הזינו סיסמה"
          value={password}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'reset-password-error' : undefined}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void submit()
          }}
        />
        {error && (
          <span className="field__error" id="reset-password-error" role="alert">
            {error}
          </span>
        )}
      </div>
    </Modal>
  )
}
