import { Modal } from './Modal'

export interface AppNotification {
  id: string
  title: string
  time: string
  read: boolean
}

interface Props {
  open: boolean
  notifications: AppNotification[]
  onClose: () => void
  onMarkAllRead: () => void
}

export function NotificationsSheet({ open, notifications, onClose, onMarkAllRead }: Props) {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <Modal
      open={open}
      title="התראות"
      subtitle={unread > 0 ? `${unread} התראות שלא נקראו` : 'אין התראות חדשות'}
      onClose={onClose}
      footer={
        /* בממשק RTL כפתור הפעולה הראשי יושב בקצה הימני */
        <>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onMarkAllRead}
            disabled={unread === 0}
          >
            סימון הכול כנקרא
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            סגירה
          </button>
        </>
      }
    >
      {notifications.length === 0 ? (
        <p className="dlg__empty">אין כרגע התראות להצגה.</p>
      ) : (
        <ul className="notif-list">
          {notifications.map((n) => (
            <li key={n.id} className={`notif ${n.read ? 'notif--read' : 'notif--unread'}`}>
              <span className="notif__dot" aria-hidden />
              <span className="notif__text">
                <span className="notif__title">{n.title}</span>
                <span className="notif__time">{n.time}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
