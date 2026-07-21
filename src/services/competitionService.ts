import { httpClient } from './httpClient'
import type {
  Competition,
  GeneralLeaderboardEntry,
  WodLeaderboardEntry
} from '../types/competition'

export async function getPublicHome(): Promise<Competition> {
  const { data } = await httpClient.get<Competition>('/public/home')
  return data
}

export async function getGeneralLeaderboard(): Promise<GeneralLeaderboardEntry[]> {
  const { data } = await httpClient.get<GeneralLeaderboardEntry[]>('/leaderboards/general')
  return data
}

export async function getWodLeaderboard(wodId: string): Promise<WodLeaderboardEntry[]> {
  const { data } = await httpClient.get<WodLeaderboardEntry[]>(`/wods/${wodId}/leaderboard`)
  return data
}
