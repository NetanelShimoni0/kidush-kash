import { HeartIcon } from './icons/UiIcons'
import lollipopBig from '../assets/decor/lollipop-big.webp'
import kiddushCup from '../assets/decor/kiddush-cup.webp'
import cupcake from '../assets/decor/cupcake.webp'
import lollipopSmall from '../assets/decor/lollipop-small.webp'
import sugarStar from '../assets/decor/sugar-star.webp'
import './Hero.css'

/*
  הקישוטים הם חיתוכים של האיור המקורי מקובץ העיצוב, לא ציור וקטורי מחדש.
  כל חיתוך עבר מיצוי רקע והפיכתו לשקוף, כך שהוא נטמע ברקע ללא תפר גלוי.
  הייבוא עובר דרך Vite כדי שהנתיבים יעבדו גם תחת נתיב-בסיס (GitHub Pages).
*/
const decorations = [
  { src: lollipopBig, className: 'hero__decor-item hero__lolli-big' },
  { src: kiddushCup, className: 'hero__decor-item hero__cup' },
  { src: cupcake, className: 'hero__decor-item hero__cupcake' },
  { src: lollipopSmall, className: 'hero__decor-item hero__lolli-small' },
  { src: sugarStar, className: 'hero__decor-item hero__star' },
]

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__decor" aria-hidden>
        {decorations.map((d) => (
          <img
            key={d.src}
            className={d.className}
            src={d.src}
            alt=""
            loading="eager"
            decoding="async"
          />
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
