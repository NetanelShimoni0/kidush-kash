import { HeartIcon } from './icons/UiIcons'
import { Cupcake, KiddushCup, Lollipop, Sprinkles, SugarStar } from './HeroDecor'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__decor" aria-hidden>
        <Lollipop className="hero__lolli hero__lolli--a" />
        <Lollipop className="hero__lolli hero__lolli--b" />
        <Cupcake className="hero__cupcake" />
        <KiddushCup className="hero__cup" />
        <SugarStar className="hero__star" />
        <Sprinkles className="hero__sprinkles" />
      </div>

      <div className="hero__content">
        <p className="hero__pill">
          <HeartIcon width={13} height={13} />
          מערכת מתנדבים לקידוש
        </p>

        <h1 className="hero__title" id="hero-title">
          קידוש משותף,
          <br />
          <span className="hero__title-accent">באופן מתוק</span>
        </h1>

        <p className="hero__lead">
          כל משפחה בוחרת מה להביא,
          <br />
          ורושמת את עצמה והתרומה להצלחת הקידוש.
        </p>
      </div>
    </section>
  )
}
