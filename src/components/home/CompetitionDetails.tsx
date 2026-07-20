import { ExternalLink, MapPin, Trophy } from 'lucide-react'
import type { Competition } from '../../types/competition'

interface CompetitionDetailsProps {
  competition: Competition
}

const currentScores = [
  { name: 'Valentina Rojas', points: 382 },
  { name: 'Martina Silva', points: 354 },
  { name: 'Alex González', points: 327 },
  { name: 'Camila Soto', points: 291 },
  { name: 'Diego Morales', points: 263 }
]

const maxScore = Math.max(...currentScores.map(participant => participant.points))

export function CompetitionDetails({ competition }: CompetitionDetailsProps) {
  return (
    <section className="panel panel--details">
      <div className="section-heading">
        <span className="eyebrow">Información</span>
        <h2>Detalles</h2>
      </div>

      <p className="details-copy">{competition.description}</p>

      <div className="location-card">
        <a
          href="https://maps.app.goo.gl/unLjT3s9eNCSsKbMA"
          target="_blank"
          rel="noreferrer"
          aria-label="Ver Ludus Centro en Google Maps"
        >
          <MapPin />
          <span>
            <small>Ubicación</small>
            <strong>Ludus Centro</strong>
          </span>
          <ExternalLink size={18} />
        </a>
      </div>

      <div className="score-chart">
        <div className="score-chart__heading">
          <div>
            <span className="eyebrow">Leaderboard</span>
            <h3>Puntuación actual</h3>
          </div>
          <Trophy aria-hidden="true" />
        </div>

        <div className="score-chart__rows">
          {currentScores.map((participant, index) => (
            <div className="score-row" key={participant.name}>
              <span className="score-row__position">{index + 1}</span>
              <span className="score-row__name">{participant.name}</span>
              <div className="score-row__track" aria-hidden="true">
                <span style={{ width: `${(participant.points / maxScore) * 100}%` }} />
              </div>
              <strong>{participant.points} pts</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
