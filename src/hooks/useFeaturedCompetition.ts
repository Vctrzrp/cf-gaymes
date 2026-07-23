import { useEffect, useState } from 'react'
import {
  getGeneralLeaderboard,
  getPublicHome,
  getWodLeaderboard
} from '../services/competitionService'
import type { Competition } from '../types/competition'

interface FeaturedCompetitionState {
  competition: Competition | null
  loading: boolean
  error: string | null
}

export function useFeaturedCompetition(): FeaturedCompetitionState {
  const [competition, setCompetition] = useState<Competition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getPublicHome()
      .then(async data => {
        const [generalResult, ...wodResults] = await Promise.allSettled([
          getGeneralLeaderboard(),
          ...(data.wods ?? []).map(wod => getWodLeaderboard(wod.id))
        ])

        if (!active) return

        setCompetition({
          ...data,
          leaderboard: generalResult.status === 'fulfilled'
            ? generalResult.value
            : data.leaderboard,
          wods: (data.wods ?? []).map((wod, index) => ({
            ...wod,
            leaderboard: wodResults[index]?.status === 'fulfilled'
              ? wodResults[index].value
              : wod.leaderboard
          }))
        })
      })
      .catch(() => {
        if (!active) return
        setCompetition(null)
        setError('No fue posible cargar la información. Inténtalo nuevamente en unos momentos.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { competition, loading, error }
}
