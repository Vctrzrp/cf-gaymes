import { useEffect, useState } from 'react'
import { getFeaturedCompetition } from '../services/competitionService'
import { mockCompetition } from '../data/mockCompetition'
import type { Competition } from '../types/competition'

interface FeaturedCompetitionState {
  competition: Competition
  loading: boolean
  usingFallback: boolean
}

export function useFeaturedCompetition(): FeaturedCompetitionState {
  const [competition, setCompetition] = useState<Competition>(mockCompetition)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let active = true

    getFeaturedCompetition()
      .then(data => {
        if (active) {
          setCompetition({
            ...data,
            // Temporalmente mantenemos los WODs de demostración completos,
            // incluyendo actividades y leaderboard para los modales.
            wods: mockCompetition.wods
          })
        }
      })
      .catch(() => {
        if (active) setUsingFallback(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { competition, loading, usingFallback }
}
