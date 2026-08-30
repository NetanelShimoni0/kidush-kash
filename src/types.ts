export type IconTint = 'pink' | 'peach' | 'apricot' | 'lavender' | 'teal'

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
  | 'dish'

export interface Contribution {
  id: string
  /** שם הפריט כפי שמוצג בכרטיס */
  title: string
  icon: FoodIconName
  tint: IconTint
  /** מספר המתנדבים הדרוש — מוצג בפס ההתקדמות ולא בכותרת */
  quantityRequired: number
  /** שמות המשפחות שנרשמו עד כה */
  registeredFamilies: string[]
  /**
   * פריט שנוסף על ידי משפחה דרך כרטיס "אחר".
   * פריטים כאלה נמחקים לגמרי באיפוס הרשימה.
   */
  isCustom?: boolean
  /** סדר התצוגה */
  order?: number
}
