import { BellIcon, MenuIcon } from './icons/UiIcons'
import './AppHeader.css'

interface Props {
  notificationCount: number
  onOpenNotifications: () => void
  onOpenMenu: () => void
  onNavigate: (target: 'list' | 'families' | 'about') => void
}

export function AppHeader({
  notificationCount,
  onOpenNotifications,
  onOpenMenu,
  onNavigate,
}: Props) {
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <button type="button" className="hdr__icon-btn" aria-label="פתיחת תפריט" onClick={onOpenMenu}>
          <MenuIcon width={26} height={26} />
        </button>

        <nav className="hdr__nav" aria-label="ניווט ראשי">
          <button type="button" className="hdr__link" onClick={() => onNavigate('list')}>
            רשימת הפריטים
          </button>
          <button type="button" className="hdr__link" onClick={() => onNavigate('families')}>
            מי נרשם
          </button>
          <button type="button" className="hdr__link" onClick={() => onNavigate('about')}>
            על הקידוש
          </button>
        </nav>

        <button
          type="button"
          className="hdr__icon-btn hdr__icon-btn--bell"
          aria-label={
            notificationCount > 0
              ? `התראות, ${notificationCount} חדשות`
              : 'התראות, אין התראות חדשות'
          }
          onClick={onOpenNotifications}
        >
          <BellIcon width={27} height={27} />
          {notificationCount > 0 && (
            <span className="hdr__badge ltr-num" aria-hidden>
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
