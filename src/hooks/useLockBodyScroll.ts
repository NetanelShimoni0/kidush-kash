import { useEffect } from 'react'

/** מונע גלילה של הרקע כאשר חלונית או מגירה פתוחה */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [active])
}
