import type { Contribution } from '../types'
import { FoodIcon } from './icons/FoodIcons'
import { CheckIcon, ChevronForwardIcon } from './icons/UiIcons'
import { ProgressBar } from './ProgressBar'

interface Props {
  item: Contribution
  onOpen: (item: Contribution) => void
}

export function ContributionRow({ item, onOpen }: Props) {
  const filled = item.registeredFamilies.length
  const total = item.quantityRequired
  /* פריט "בודד" (דרוש מתנדב אחד) מסומן כהושלם במקום להציג פס התקדמות */
  const isSingle = total <= 1
  const isDone = isSingle && filled > 0

  const families = filled > 0 ? item.registeredFamilies.join(', ') : 'עדיין לא נרשמה משפחה'

  return (
    <li className="row">
      <button
        type="button"
        className={`row__btn${isDone ? ' row__btn--done' : ''}`}
        onClick={() => onOpen(item)}
        aria-label={
          isDone
            ? `${item.title} — הושלם. ${families}. פתיחת פרטים`
            : `${item.title} — נרשמו ${filled} מתוך ${total}. פתיחת פרטים`
        }
      >
        <span className={`row__icon row__icon--${item.tint}`} aria-hidden>
          <FoodIcon name={item.icon} width={30} height={30} />
        </span>

        <span className="row__text">
          <span className="row__title">{item.title}</span>
          <span className="row__families">{families}</span>
        </span>

        {isDone ? (
          <span className="row__done" aria-hidden>
            <CheckIcon width={17} height={17} />
          </span>
        ) : (
          <>
            <span className="row__status">
              <span className="row__count ltr-num" aria-hidden>
                {filled}/{total}
              </span>
              <ProgressBar filled={filled} total={total} />
            </span>
            <span className="row__chevron" aria-hidden>
              <ChevronForwardIcon width={17} height={17} />
            </span>
          </>
        )}
      </button>
    </li>
  )
}
