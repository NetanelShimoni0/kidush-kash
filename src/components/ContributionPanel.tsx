import type { Contribution } from '../types'
import { ContributionRow } from './ContributionRow'
import { CupcakeIcon, PlusIcon } from './icons/UiIcons'
import './ContributionPanel.css'

interface Props {
  items: Contribution[]
  isLoading: boolean
  errorMessage: string | null
  onOpenItem: (item: Contribution) => void
  onOpenOther: () => void
  onRetry: () => void
}

function Squiggle() {
  return (
    <svg className="panel__squiggle" viewBox="0 0 224 18" aria-hidden focusable="false">
      <path
        d="M4 8.4C34 3.6 62 3.2 90 6.4s58 4.4 90-.4"
        fill="none"
        stroke="var(--c-rose)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M24 15.2c28-4 54-4.2 80-1.2s52 4 116-.6"
        fill="none"
        stroke="var(--c-rose)"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.62"
      />
    </svg>
  )
}

function RowSkeleton() {
  return (
    <li className="row row--skeleton" aria-hidden>
      <div className="row__btn">
        <span className="sk sk--circle" />
        <span className="row__text">
          <span className="sk sk--line sk--w60" />
          <span className="sk sk--line sk--w40" />
        </span>
        <span className="sk sk--bar" />
      </div>
    </li>
  )
}

export function ContributionPanel({
  items,
  isLoading,
  errorMessage,
  onOpenItem,
  onOpenOther,
  onRetry,
}: Props) {
  return (
    <section className="panel" id="list" aria-labelledby="panel-title">
      <div className="panel__inner">
        <header className="panel__head">
          <h2 className="panel__title" id="panel-title">
            <span>מה מביאים?</span>
            <CupcakeIcon width={26} height={26} aria-hidden />
          </h2>
          <Squiggle />
        </header>

        {errorMessage ? (
          <div className="panel__state panel__state--error" role="alert">
            <p className="panel__state-title">{errorMessage}</p>
            <button type="button" className="btn btn--primary" onClick={onRetry}>
              נסו שוב
            </button>
          </div>
        ) : (
          <ul className="panel__list">
            {isLoading ? (
              <>
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
                <li className="panel__loading" role="status">
                  טוען את רשימת הפריטים...
                </li>
              </>
            ) : items.length === 0 ? (
              <li className="panel__state">
                <p className="panel__state-title">אין עדיין פריטים ברשימה</p>
                <p className="panel__state-text">
                  הוסיפו את הפריט הראשון כדי שהמשפחות יוכלו להירשם.
                </p>
              </li>
            ) : (
              items.map((item) => (
                <ContributionRow key={item.id} item={item} onOpen={onOpenItem} />
              ))
            )}

            {!isLoading && (
              <li className="row row--other">
                <button
                  type="button"
                  className="row__btn row__btn--other"
                  onClick={onOpenOther}
                  aria-label="אחר — לחצו כדי לראות מה אחרים מביאים"
                >
                  <span className="row__icon row__icon--add" aria-hidden>
                    <PlusIcon width={24} height={24} />
                  </span>
                  <span className="row__text">
                    <span className="row__title">אחר</span>
                    <span className="row__families">לחצו כדי לראות מה אחרים מביאים</span>
                  </span>
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}
