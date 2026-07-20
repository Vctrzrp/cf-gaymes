export interface CompetitionCategory {
  id: string
  name: string
  capacity: number
  registered: number
}

export interface CompetitionWod {
  id: string
  name: string
  date: string
  activities?: string[]
  leaderboard?: Array<{
    name: string
    score: string
    points: number
  }>
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
  categories: CompetitionCategory[]
  wods?: CompetitionWod[]
}
