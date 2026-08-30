import type { Contribution } from '../types'

/**
 * הנתונים תואמים אחד לאחד לרשימה שבעיצוב הייחוס.
 * בהמשך אפשר להחליף את המקור הזה בקריאה לשרת מבלי לגעת ברכיבי התצוגה.
 */
export const initialContributions: Contribution[] = [
  {
    id: 'cakes',
    title: 'עוגות (עד 4 מתנדבים)',
    icon: 'cake',
    tint: 'pink',
    quantityRequired: 4,
    registeredFamilies: ['משפחת לוי', 'משפחת כהן'],
  },
  {
    id: 'cookies',
    title: 'עוגיות',
    icon: 'cookie',
    tint: 'peach',
    quantityRequired: 1,
    registeredFamilies: ['משפחת ישראלי', 'משפחת בר'],
  },
  {
    id: 'sweet-pastries',
    title: 'מאפים מתוקים',
    icon: 'croissant',
    tint: 'lavender',
    quantityRequired: 2,
    registeredFamilies: ['משפחת אברמוביץ׳'],
  },
  {
    id: 'savory-pastries',
    title: 'מאפים מלוחים',
    icon: 'muffin',
    tint: 'mint',
    quantityRequired: 2,
    registeredFamilies: ['משפחת שטרן', 'משפחת רוזן'],
  },
  {
    id: 'snacks',
    title: 'חטיפים + ופלים',
    icon: 'candy',
    tint: 'pink',
    quantityRequired: 2,
    registeredFamilies: ['משפחת דוידי'],
  },
  {
    id: 'cut-vegetables',
    title: 'ירקות חתוכים',
    icon: 'carrot',
    tint: 'peach',
    quantityRequired: 1,
    registeredFamilies: ['משפחת גולדשטיין'],
  },
  {
    id: 'cut-fruits',
    title: 'פירות חתוכים',
    icon: 'apple',
    tint: 'pink',
    quantityRequired: 2,
    registeredFamilies: ['משפחת מזרחי'],
  },
  {
    id: 'kugel',
    title: 'קיגל (מספר מתנדבים)',
    icon: 'kugel',
    tint: 'lavender',
    quantityRequired: 3,
    registeredFamilies: ['משפחת פרידמן', 'משפחת הלוי'],
  },
  {
    id: 'iced-coffee',
    title: 'קפה קר (3 בקבוקים)',
    icon: 'icedCoffee',
    tint: 'pink',
    quantityRequired: 3,
    registeredFamilies: ['משפחת רגב', 'משפחת קמחי'],
  },
]
