export type IconTint = 'pink' | 'peach' | 'lavender' | 'mint'

export type FoodIconName =
  | 'cake'
  | 'cookie'
  | 'croissant'
  | 'muffin'
  | 'candy'
  | 'carrot'
  | 'apple'
  | 'kugel'
  | 'icedCoffee'

export interface Contribution {
  id: string
  /** שם הפריט כפי שמוצג בכרטיס */
  title: string
  icon: FoodIconName
  tint: IconTint
  /**
   * מספר המתנדבים הדרוש. כאשר הערך הוא 1 — הפריט מוצג כמשימה בודדת
   * עם סימון "הושלם" במקום פס התקדמות (כפי שמופיע בעיצוב).
   */
  quantityRequired: number
  /** שמות המשפחות שנרשמו עד כה */
  registeredFamilies: string[]
}
