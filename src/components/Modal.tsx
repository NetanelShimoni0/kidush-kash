import { useEffect, useId, useRef, type ReactNode } from 'react'
import { CloseIcon } from './icons/UiIcons'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import './Modal.css'

interface Props {
  open: boolean
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  /** 'sheet' — נפתח מלמטה במובייל; 'drawer' — מגירה מהצד הימני */
  variant?: 'sheet' | 'drawer'
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, title, subtitle, onClose, children, footer, variant = 'sheet' }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descId = useId()

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const node = dialogRef.current
    node?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !node) return
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`ovl ovl--${variant}`} onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={`dlg dlg--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? descId : undefined}
        dir="rtl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="dlg__grip" aria-hidden />

        <header className="dlg__head">
          <div className="dlg__heading">
            <h2 className="dlg__title" id={titleId}>
              {title}
            </h2>
            {subtitle && (
              <p className="dlg__subtitle" id={descId}>
                {subtitle}
              </p>
            )}
          </div>
          <button type="button" className="dlg__close" aria-label="סגירת החלון" onClick={onClose}>
            <CloseIcon width={19} height={19} />
          </button>
        </header>

        <div className="dlg__body">{children}</div>

        {footer && <footer className="dlg__foot">{footer}</footer>}
      </div>
    </div>
  )
}
