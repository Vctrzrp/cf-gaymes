import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import type { Competition } from '../../types/competition'

interface HeroProps {
  competition: Competition
}

export function Hero({ competition }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__copy">
          <span className="eyebrow">Competencia oficial</span>
          <h1>{competition.name}</h1>
          <p>{competition.subtitle}</p>

          <div className="hero__meta">
            <span><CalendarDays size={17} /> {competition.eventStart} — {competition.eventEnd}</span>
            <a
              href="https://maps.app.goo.gl/unLjT3s9eNCSsKbMA"
              target="_blank"
              rel="noreferrer"
              aria-label="Ver Ludus Centro en Google Maps"
            >
              <MapPin size={17} /> {competition.location}
            </a>
          </div>

          <a className="button button--primary" href="#wods">
            Ver WODs
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="hero__visual">
          <img
            src="/images/crossfit-gaymes-logo-fuerza.png?v=2"
            alt="Crossfit Gaymes"
          />
        </div>
      </div>
    </section>
  )
}
