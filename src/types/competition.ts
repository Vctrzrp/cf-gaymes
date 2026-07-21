export interface CompetitionCategory {
  id: string
  name: string
  capacity: number
  registered: number
}

export interface WodLeaderboardEntry {
  position?: number
  participantId?: string
  name: string
  score: string
  points: number
}

export interface GeneralLeaderboardEntry {
  position: number
  participantId: string
  name: string
  points: number
}

export interface CompetitionWod {
  id: string
  name: string
  date: string
  activities?: string[]
  leaderboard?: WodLeaderboardEntry[]
}

export interface Competition {
  id: string
  name: string
  subtitle: string
  description: string
  registrationStart: string
  registrationEnd: string
  eventStart: string
  eventEnd: string
  location: string
  mapsUrl?: string
  categories: CompetitionCategory[]
  wods?: CompetitionWod[]
  leaderboard?: GeneralLeaderboardEntry[]
}
