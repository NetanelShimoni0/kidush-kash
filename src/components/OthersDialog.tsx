import type { Contribution } from '../types'
import { Modal } from './Modal'
import { FoodIcon } from './icons/FoodIcons'

interface Props {
  open: boolean
  items: Contribution[]
  onClose: () => void
}

export function OthersDialog({ open, items, onClose }: Props) {
  const registered = items.filter((c) => c.registeredFamilies.length > 0)
  const totalFamilies = new Set(registered.flatMap((c) => c.registeredFamilies)).size

  return (
    <Modal
      open={open}
      title="מה אחרים מביאים"
      subtitle={
        totalFamilies > 0
          ? `${totalFamilies} משפחות כבר נרשמו לקידוש`
          : 'עדיין לא נרשמו משפחות'
      }
      onClose={onClose}
      footer={
        <button type="button" className="btn btn--primary" onClick={onClose}>
          סגירה
        </button>
      }
    >
      {registered.length === 0 ? (
        <p className="dlg__empty">
          עדיין אין הרשמות.
          <br />
          בחרו פריט מהרשימה כדי להיות הראשונים.
        </p>
      ) : (
        <ul className="fam-list">
          {registered.map((item) => (
            <li className="fam" key={item.id}>
              <span className={`row__icon row__icon--${item.tint}`} aria-hidden>
                <FoodIcon name={item.icon} width={22} height={22} />
              </span>
              <span className="row__text">
                <span className="row__title">{item.title}</span>
                <span className="row__families">{item.registeredFamilies.join(', ')}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
