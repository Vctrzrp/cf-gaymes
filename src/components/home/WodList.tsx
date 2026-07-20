import { CalendarDays, CheckCircle2, ChevronRight, Clock3, Dumbbell, Flame, Trophy, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CompetitionWod } from '../../types/competition'

interface WodListProps {
  wods: CompetitionWod[]
}

const dateFormatter = new Intl.DateTimeFormat('es-CL', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})

function getWodStatus(date: string, now: Date) {
  const wodDate = new Date(`${date}T00:00:00`)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (wodDate.getTime() === today.getTime()) {
    return { label: 'HOY', state: 'today' as const, icon: Flame }
  }

  if (wodDate < today) {
    return { label: 'Finalizado', state: 'finished' as const, icon: CheckCircle2 }
  }

  const remaining = wodDate.getTime() - now.getTime()
  const days = Math.floor(remaining / 86_400_000)
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000)
  const minutes = Math.max(1, Math.floor((remaining % 3_600_000) / 60_000))
  const label = days > 0
    ? `Faltan ${days} ${days === 1 ? 'día' : 'días'}${hours ? ` y ${hours} h` : ''}`
    : hours > 0
      ? `Faltan ${hours} h y ${minutes} min`
      : `Faltan ${minutes} min`

  return { label, state: 'upcoming' as const, icon: Clock3 }
}

export function WodList({ wods }: WodListProps) {
  const [now, setNow] = useState(() => new Date())
  const [selectedWod, setSelectedWod] = useState<CompetitionWod | null>(null)

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!selectedWod) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedWod(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedWod])

  return (
    <section id="wods" className="panel">
      <div className="section-heading">
        <h2>WODs</h2>
      </div>

      <div className="wod-list">
        {wods.map(wod => {
          const status = getWodStatus(wod.date, now)
          const StatusIcon = status.icon

          return (
            <button
              className="wod-row"
              key={wod.id}
              type="button"
              aria-haspopup="dialog"
              onClick={() => setSelectedWod(wod)}
            >
              <div className="wod-row__name">
                <span className="wod-row__number"><Flame size={18} /></span>
                <h3>{wod.name}</h3>
              </div>
              <div className="wod-row__schedule">
                <span className="wod-row__date">
                  <CalendarDays size={15} />
                  {dateFormatter.format(new Date(`${wod.date}T00:00:00`))}
                </span>
                <strong className={`wod-status wod-status--${status.state}`}>
                  <StatusIcon size={15} />
                  {status.label}
                </strong>
              </div>
              <ChevronRight className="wod-row__chevron" size={19} aria-hidden="true" />
            </button>
          )
        })}
      </div>

      {selectedWod && (
        <div
          className="wod-modal-backdrop"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelectedWod(null)
          }}
        >
          <section
            className="wod-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wod-modal-title"
          >
            <header className="wod-modal__header">
              <div>
                <span className="eyebrow">Detalle del WOD</span>
                <h2 id="wod-modal-title">{selectedWod.name}</h2>
                <p><CalendarDays size={16} /> {dateFormatter.format(new Date(`${selectedWod.date}T00:00:00`))}</p>
              </div>
              <button
                className="wod-modal__close"
                type="button"
                aria-label="Cerrar detalle del WOD"
                onClick={() => setSelectedWod(null)}
              >
                <X />
              </button>
            </header>

            <div className="wod-modal__section">
              <h3><Dumbbell size={19} /> Actividades</h3>
              <ol className="wod-activities">
                {(selectedWod.activities ?? []).map(activity => (
                  <li key={activity}>{activity}</li>
                ))}
              </ol>
            </div>

            <div className="wod-modal__section">
              <h3><Trophy size={19} /> Leaderboard</h3>
              <div className="wod-leaderboard">
                {(selectedWod.leaderboard ?? []).map((participant, index) => (
                  <div className="wod-leaderboard__row" key={participant.name}>
                    <span className="wod-leaderboard__position">{index + 1}</span>
                    <strong>{participant.name}</strong>
                    <span>{participant.score}</span>
                    <b>{participant.points} pts</b>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}
