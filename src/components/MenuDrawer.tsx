import { Modal } from './Modal'
import { CalendarIcon, InfoIcon, ListIcon, UsersIcon } from './icons/UiIcons'

interface Props {
  open: boolean
  onClose: () => void
  onNavigate: (target: 'list' | 'families' | 'about') => void
  dataSourceLabel: string
}

export function MenuDrawer({ open, onClose, onNavigate, dataSourceLabel }: Props) {
  return (
    <Modal open={open} title="תפריט" onClose={onClose} variant="drawer">
      <nav className="menu-list" aria-label="ניווט ראשי">
        <button type="button" className="menu-item" onClick={() => onNavigate('list')}>
          <ListIcon width={21} height={21} />
          רשימת הפריטים
        </button>
        <button type="button" className="menu-item" onClick={() => onNavigate('families')}>
          <UsersIcon width={21} height={21} />
          מי נרשם
        </button>
        <button type="button" className="menu-item" onClick={() => onNavigate('about')}>
          <InfoIcon width={21} height={21} />
          על הקידוש
        </button>
        <button type="button" className="menu-item" onClick={() => onNavigate('about')}>
          <CalendarIcon width={21} height={21} />
          מועד הקידוש
        </button>
      </nav>

      <p className="menu-note">{dataSourceLabel}</p>
    </Modal>
  )
}
