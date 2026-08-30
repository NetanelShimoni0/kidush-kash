import type { SVGProps } from 'react'
import type { FoodIconName } from '../../types'

type P = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

/** עוגות */
export function CakeIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4.2 20.2h15.6" />
      <path d="M5.6 20.2v-6.9a1 1 0 0 1 1-1h10.8a1 1 0 0 1 1 1v6.9" />
      <path d="M5.6 15.1c1.1 0 1.1 1.2 2.2 1.2s1.1-1.2 2.2-1.2 1.1 1.2 2.2 1.2 1.1-1.2 2.2-1.2 1.1 1.2 2.2 1.2 1.1-1.2 1.8-1.2" />
      <path d="M12 12.3V8.6" />
      <path d="M12 8.6c0-.9.9-1.3.9-2.2 0-.8-.9-1.5-.9-1.5s-.9.7-.9 1.5c0 .9.9 1.3.9 2.2Z" />
    </svg>
  )
}

/** עוגיות */
export function CookieIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M20.4 11.6a8.5 8.5 0 1 1-6.6-8.3 3 3 0 0 0 3.4 3.6 3 3 0 0 0 3.2 4.7Z" />
      <circle cx="9.4" cy="10" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="13.7" cy="13.6" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="9.1" cy="14.9" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="9.1" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** מאפים מתוקים */
export function CroissantIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M2.9 13.4c2 3.3 5.4 5 9.1 5s7.1-1.7 9.1-5" />
      <path d="M2.9 13.4c-.6-1.6.4-3 1.9-3 1.2 0 1.9.8 2.2 1.8" />
      <path d="M21.1 13.4c.6-1.6-.4-3-1.9-3-1.2 0-1.9.8-2.2 1.8" />
      <path d="M8.5 17.9c-.4-1.7 0-3.6.9-5" />
      <path d="M15.5 17.9c.4-1.7 0-3.6-.9-5" />
      <path d="M12 18.4v-5.5" />
    </svg>
  )
}

/** מאפים מלוחים */
export function MuffinIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6.1 11.4h11.8l-1.2 7.9a1 1 0 0 1-1 .9H8.3a1 1 0 0 1-1-.9L6.1 11.4Z" />
      <path d="M5.5 11.4c-.7-2.6 1.2-4.8 3.5-4.5C9.4 5.1 10.6 4 12 4s2.6 1.1 3 2.9c2.3-.3 4.2 1.9 3.5 4.5" />
      <path d="M9.4 14.3v3.7M12 14.3v3.7M14.6 14.3v3.7" />
    </svg>
  )
}

/** חטיפים + ופלים */
export function CandyIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3.7" />
      <path d="M8.6 10.3 4.9 7.7c-.6-.4-1.3.1-1.2.8l.6 3.5-.6 3.5c-.1.7.6 1.2 1.2.8l3.7-2.6" />
      <path d="m15.4 10.3 3.7-2.6c.6-.4 1.3.1 1.2.8l-.6 3.5.6 3.5c.1.7-.6 1.2-1.2.8l-3.7-2.6" />
      <path d="M11 11.3v1.4M13 11.3v1.4" />
    </svg>
  )
}

/** ירקות חתוכים */
export function CarrotIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12.1 10.3 6.7 18.6c-.5.8.3 1.7 1.2 1.3l8.8-4.3a1 1 0 0 0 .3-1.6l-3.4-3.8a1 1 0 0 0-1.5.1Z" />
      <path d="m10.2 14.1 2 2.2M12.5 12.3l2 2.2" />
      <path d="m14.7 10.4 2.5-2.5" />
      <path d="M17.2 7.9c-.7-1.4 0-2.9 1.4-3.4" />
      <path d="M17.2 7.9c1.4.7 2.9 0 3.4-1.4" />
    </svg>
  )
}

/** פירות חתוכים */
export function AppleIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 8.7c-1-.9-2.2-1.2-3.3-1C6.5 8.1 5 10.1 5 12.7c0 3.4 2.5 7 4.5 7 .9 0 1.5-.5 2.5-.5s1.6.5 2.5.5c2 0 4.5-3.6 4.5-7 0-2.6-1.5-4.6-3.7-5-1.1-.2-2.3.1-3.3 1Z" />
      <path d="M12 8.7V5.9" />
      <path d="M12 5.9c1.7 0 3.1-1.3 3.1-2.8-1.7 0-3.1 1.3-3.1 2.8Z" />
    </svg>
  )
}

/** קיגל */
export function KugelIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4.3 19.4h15.4" />
      <path d="M6.2 19.4v-2.7C6.2 12 8.8 8.3 12 8.3s5.8 3.7 5.8 8.4v2.7" />
      <path d="M8.4 12.6c.8.9 1.8.9 2.6 0M13 12.6c.8.9 1.8.9 2.6 0" />
      <path d="M7.2 16.1c.9 1 2 1 2.9 0M14 16.1c.9 1 2 1 2.9 0" />
      <path d="M12 8.3V6.2" />
      <circle cx="12" cy="4.9" r="1.3" />
    </svg>
  )
}

/** קפה קר */
export function IcedCoffeeIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 8.6h11l-1.1 10.6a1 1 0 0 1-1 .9H8.6a1 1 0 0 1-1-.9L6.5 8.6Z" />
      <path d="M5.6 6.1h12.8a.6.6 0 0 1 .6.7l-.2 1.8H5.2L5 6.8a.6.6 0 0 1 .6-.7Z" />
      <path d="M12.6 6.1V3.4h2.2" />
      <path d="M9.6 11.7l.4 5M12 11.7v5M14.4 11.7l-.4 5" />
    </svg>
  )
}

const registry: Record<FoodIconName, (p: P) => JSX.Element> = {
  cake: CakeIcon,
  cookie: CookieIcon,
  croissant: CroissantIcon,
  muffin: MuffinIcon,
  candy: CandyIcon,
  carrot: CarrotIcon,
  apple: AppleIcon,
  kugel: KugelIcon,
  icedCoffee: IcedCoffeeIcon,
}

export function FoodIcon({ name, ...rest }: { name: FoodIconName } & P) {
  const Cmp = registry[name]
  return <Cmp {...rest} />
}
