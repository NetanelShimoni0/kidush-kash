import { HeartIcon } from './icons/UiIcons'
import './Hero.css'

/*
  הקישוטים הם חיתוכים של האיור המקורי מקובץ העיצוב, לא ציור וקטורי מחדש.
  כל חיתוך עבר נרמול רקע לצבע הרקע של הדף והחלקת קצוות לשקיפות,
  כך שהוא נטמע ברקע ללא תפר גלוי.
*/
const decorations = [
  { src: '/decor/lollipop-big.webp', className: 'hero__decor-item hero__lolli-big' },
  { src: '/decor/kiddush-cup.webp', className: 'hero__decor-item hero__cup' },
  { src: '/decor/cupcake.webp', className: 'hero__decor-item hero__cupcake' },
  { src: '/decor/lollipop-small.webp', className: 'hero__decor-item hero__lolli-small' },
  { src: '/decor/sugar-star.webp', className: 'hero__decor-item hero__star' },
]

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__decor" aria-hidden>
        {decorations.map((d) => (
          <img key={d.src} className={d.className} src={d.src} alt="" loading="eager" decoding="async" />
        ))}
      </div>

      <div className="hero__content">
        <p className="hero__pill">
          <HeartIcon width={13} height={13} />
          קידוש מניין ק״ש סניף בני עקיבא
        </p>

        <h1 className="hero__title" id="hero-title">
          קידוש משותף,
          <br />
          <span className="hero__title-accent">באופן מתוק</span>
        </h1>

        <p className="hero__lead">
          כל משפחה בוחרת מה להביא,
          <br />
          ורושמת את עצמה.
        </p>
      </div>
    </section>
  )
}
