import { useEffect } from 'react'
import { CheckIcon, CloseIcon } from './icons/UiIcons'
import './Toast.css'

export interface ToastMessage {
  id: number
  text: string
  tone: 'success' | 'error'
}

interface Props {
  toast: ToastMessage | null
  onDismiss: () => void
}

export function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [toast, onDismiss])

  if (!toast) return null

  return (
    <div className={`toast toast--${toast.tone}`} role="status" aria-live="polite" dir="rtl">
      <span className="toast__icon" aria-hidden>
        {toast.tone === 'success' ? (
          <CheckIcon width={15} height={15} />
        ) : (
          <CloseIcon width={15} height={15} />
        )}
      </span>
      <span className="toast__text">{toast.text}</span>
      <button type="button" className="toast__close" aria-label="סגירת ההודעה" onClick={onDismiss}>
        <CloseIcon width={15} height={15} />
      </button>
    </div>
  )
}
