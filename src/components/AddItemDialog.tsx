import { useEffect, useMemo, useState } from 'react'
import { Modal } from './Modal'

interface Props {
  open: boolean
  existingTitles: string[]
  onClose: () => void
  onAdd: (title: string, familyName: string) => Promise<void>
}

export function AddItemDialog({ open, existingTitles, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [touched, setTouched] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (open) return
    setTitle('')
    setFamilyName('')
    setTouched(false)
    setFormError(null)
    setIsSaving(false)
  }, [open])

  const titleError = useMemo(() => {
    const value = title.trim()
    if (value.length === 0) return 'יש להזין את שם הפריט'
    if (value.length < 2) return 'שם הפריט קצר מדי'
    if (value.length > 40) return 'שם הפריט ארוך מדי'
    if (existingTitles.some((t) => t.trim() === value)) return 'הפריט הזה כבר קיים ברשימה'
    return null
  }, [title, existingTitles])

  const familyError = useMemo(() => {
    const value = familyName.trim()
    if (value.length === 0) return 'יש להזין את שם המשפחה'
    if (value.length < 2) return 'שם המשפחה קצר מדי'
    if (value.length > 40) return 'שם המשפחה ארוך מדי'
    return null
  }, [familyName])

  const submit = async () => {
    setTouched(true)
    if (titleError || familyError) return
    setIsSaving(true)
    setFormError(null)
    try {
      const family = familyName.trim()
      await onAdd(title.trim(), family.startsWith('משפחת') ? family : `משפחת ${family}`)
      onClose()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : String(error))
      setIsSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      title="הוספת פריט לרשימה"
      subtitle="מביאים משהו שלא מופיע ברשימה? הוסיפו אותו כאן"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn--primary" onClick={submit} disabled={isSaving}>
            {isSaving ? 'מוסיף...' : 'הוספה'}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            ביטול
          </button>
        </>
      }
    >
      <div className="field">
        <label className="field__label" htmlFor="custom-title">
          מה מביאים?
        </label>
        <input
          id="custom-title"
          className={`field__input${touched && titleError ? ' field__input--invalid' : ''}`}
          type="text"
          dir="rtl"
          placeholder="לדוגמה: סלט ירקות"
          value={title}
          aria-invalid={touched && titleError ? true : undefined}
          aria-describedby={touched && titleError ? 'custom-title-error' : undefined}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        {touched && titleError && (
          <span className="field__error" id="custom-title-error" role="alert">
            {titleError}
          </span>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="custom-family">
          שם המשפחה
        </label>
        <input
          id="custom-family"
          className={`field__input${touched && familyError ? ' field__input--invalid' : ''}`}
          type="text"
          dir="rtl"
          placeholder="לדוגמה: כהן"
          autoComplete="family-name"
          value={familyName}
          aria-invalid={touched && familyError ? true : undefined}
          aria-describedby={touched && familyError ? 'custom-family-error' : undefined}
          onChange={(e) => setFamilyName(e.target.value)}
          onBlur={() => setTouched(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void submit()
          }}
        />
        {touched && familyError && (
          <span className="field__error" id="custom-family-error" role="alert">
            {familyError}
          </span>
        )}
      </div>

      {formError && (
        <p className="field__error" role="alert">
          {formError}
        </p>
      )}
    </Modal>
  )
}
