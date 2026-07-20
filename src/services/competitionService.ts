import { httpClient } from './httpClient'
import type { Competition } from '../types/competition'

export async function getFeaturedCompetition(): Promise<Competition> {
  const { data } = await httpClient.get<Competition>('/competitions/featured')
  return data
}
