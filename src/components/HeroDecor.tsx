/**
 * אלמנטים דקורטיביים לאזור ה-Hero — סוכריות, קאפקייק וגביע קידוש.
 * כולם וקטוריים, ללא תלות בקבצי תמונה, ומוסתרים מקוראי מסך.
 */

/** ספירלת סוכרייה על מקל */
export function Lollipop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-40 -40 80 104" aria-hidden focusable="false">
      <defs>
        <radialGradient id="lolliShade" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FBE9EF" />
        </radialGradient>
      </defs>
      <rect x="-2.6" y="26" width="5.2" height="36" rx="2.6" fill="#F3E4DA" />
      <rect x="-2.6" y="26" width="2.1" height="36" rx="1.1" fill="#FBF3EC" />
      <circle cx="0" cy="0" r="34" fill="url(#lolliShade)" />
      <path
        d="M3 0 A5 5 0 0 0 -7 0 A9 9 0 0 0 11 0 A13 13 0 0 0 -15 0 A17 17 0 0 0 19 0 A21 21 0 0 0 -23 0 A25 25 0 0 0 27 0 A29 29 0 0 0 -31 0"
        fill="none"
        stroke="#F3A9C1"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <circle cx="0" cy="0" r="34" fill="none" stroke="#F6C7D6" strokeWidth="1.4" />
      <ellipse cx="-11" cy="-15" rx="9" ry="6" fill="#FFFFFF" opacity="0.42" transform="rotate(-28 -11 -15)" />
    </svg>
  )
}

/** קאפקייק עם קרם ורוד וסוכריות צבעוניות */
export function Cupcake({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 132" aria-hidden focusable="false">
      <defs>
        <linearGradient id="frostG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDD9E4" />
          <stop offset="100%" stopColor="#F5AFC7" />
        </linearGradient>
        <linearGradient id="wrapG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F6E2CE" />
          <stop offset="100%" stopColor="#E9C9AC" />
        </linearGradient>
      </defs>
      <path d="M22 74h76l-9 48a6 6 0 0 1-6 5H37a6 6 0 0 1-6-5L22 74Z" fill="url(#wrapG)" />
      <g stroke="#DDB894" strokeWidth="2.4" opacity="0.55" strokeLinecap="round">
        <path d="M39 80l-4 43M55 80l-2 43M71 80l2 43M87 80l4 43" />
      </g>
      <path d="M18 76c0-6 4-11 10-13 1-13 12-22 25-20 5-11 19-14 28-6 8 7 9 19 2 27 8 4 11 14 6 21 0 0-24 3-35 3s-36-3-36-3Z" fill="url(#frostG)" />
      <ellipse cx="44" cy="44" rx="13" ry="9" fill="#FFFFFF" opacity="0.45" transform="rotate(-18 44 44)" />
      <g>
        <circle cx="38" cy="62" r="3" fill="#8FD9C6" />
        <circle cx="58" cy="55" r="3" fill="#F6C244" />
        <circle cx="76" cy="64" r="3" fill="#A78FE0" />
        <circle cx="66" cy="70" r="2.6" fill="#EE6E9E" />
        <circle cx="48" cy="70" r="2.4" fill="#7FC7EA" />
      </g>
    </svg>
  )
}

/** גביע קידוש על תחתית */
export function KiddushCup({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 168" aria-hidden focusable="false">
      <defs>
        <linearGradient id="cupG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE3D2" />
          <stop offset="38%" stopColor="#EADCC8" />
          <stop offset="52%" stopColor="#6FBFC9" />
          <stop offset="82%" stopColor="#2F86A8" />
          <stop offset="100%" stopColor="#276E92" />
        </linearGradient>
        <linearGradient id="saucerG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1E7D6" />
          <stop offset="100%" stopColor="#DCCBB2" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="146" rx="60" ry="17" fill="url(#saucerG)" />
      <ellipse cx="70" cy="142" rx="46" ry="12" fill="#E7DAC4" />
      <path d="M32 22h76l-7 86a26 26 0 0 1-25 23h-12a26 26 0 0 1-25-23L32 22Z" fill="url(#cupG)" />
      <ellipse cx="70" cy="22" rx="38" ry="9" fill="#F5EDE0" />
      <ellipse cx="70" cy="22" rx="31" ry="6.4" fill="#E3D3B8" />
      <path d="M46 40h48" stroke="#C9B79A" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
      <path d="M47 50h46M48 60h44" stroke="#BFAA8B" strokeWidth="1.3" opacity="0.5" strokeLinecap="round" />
      <path d="M42 34c4 44 6 68 8 82" stroke="#FFFFFF" strokeWidth="5" opacity="0.22" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** כוכב סוכר סגול */
export function SugarStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path
        d="M24 3.5c1.2 0 2.3.7 2.8 1.8l4.4 9.2 10 1.4a3 3 0 0 1 1.7 5.1l-7.3 7.2 1.8 10.1a3 3 0 0 1-4.4 3.1L24 36.6l-9 4.8a3 3 0 0 1-4.4-3.1l1.8-10.1-7.3-7.2a3 3 0 0 1 1.7-5.1l10-1.4 4.4-9.2A3 3 0 0 1 24 3.5Z"
        fill="#C4B2EC"
      />
      <path d="M18 14c2-3 4-5 6-6" stroke="#E3D9F8" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** נקודות סוכר קטנות מפוזרות */
export function Sprinkles({ className }: { className?: string }) {
  const dots = [
    { cx: 12, cy: 30, r: 3.2, fill: '#F3A9C1' },
    { cx: 46, cy: 12, r: 2.4, fill: '#EFC7D6' },
    { cx: 74, cy: 40, r: 3.6, fill: '#F7B9CD' },
    { cx: 96, cy: 16, r: 2.2, fill: '#C4B2EC' },
    { cx: 118, cy: 44, r: 3, fill: '#F3A9C1' },
    { cx: 140, cy: 22, r: 2.6, fill: '#9BDBCB' },
  ]
  return (
    <svg className={className} viewBox="0 0 152 56" aria-hidden focusable="false">
      {dots.map((d, i) => (
        <circle key={i} {...d} />
      ))}
    </svg>
  )
}
