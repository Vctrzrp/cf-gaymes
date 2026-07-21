import { useEffect, useState } from 'react'
import {
  getGeneralLeaderboard,
  getPublicHome,
  getWodLeaderboard
} from '../services/competitionService'
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
