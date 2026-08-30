import { Modal } from './Modal'

interface Props {
  open: boolean
  onClose: () => void
}

export function AboutDialog({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      title="על הקידוש"
      subtitle="שבת פרשת השבוע, לאחר תפילת שחרית"
      onClose={onClose}
      footer={
        <button type="button" className="btn btn--primary" onClick={onClose}>
          סגירה
        </button>
      }
    >
      <p className="field__hint" style={{ fontSize: '14px', lineHeight: 1.75 }}>
        הקידוש מתקיים בבית הכנסת בסיום התפילה. כל משפחה בוחרת פריט אחד מהרשימה,
        רושמת את שמה, ומביאה אותו עד שעה לפני תחילת הקידוש.
      </p>

      <h3 className="dlg__section-title">פרטים</h3>
      <ul className="fam-list">
        <li className="fam">
          <span className="fam__name">מועד</span>
          <span className="row__families ltr-num">30/08/2026</span>
        </li>
        <li className="fam">
          <span className="fam__name">שעה</span>
          <span className="row__families ltr-num">11:15</span>
        </li>
        <li className="fam">
          <span className="fam__name">מיקום</span>
          <span className="row__families">אולם בית הכנסת</span>
        </li>
      </ul>
    </Modal>
  )
}
