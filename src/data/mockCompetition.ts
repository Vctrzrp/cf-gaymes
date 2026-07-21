import type { Competition } from '../types/competition'

export const mockCompetition: Competition = {
  id: '1',
  name: 'Gaymes wods 2026',
  subtitle: 'Cuatro sábados. Cuatro pruebas. Un marico campeón.',
  description:
    'Competencia individual de CrossFit desarrollada durante los cuatro sábados de agosto. Cada fecha suma puntos para el leaderboard general.',
  registrationStart: '01 JUL 2026',
  registrationEnd: '31 JUL 2026',
  eventStart: '08 AGO 2026',
  eventEnd: '29 AGO 2026',
  location: 'Ludus Centro',
  categories: [
    { id: 'rx-men', name: 'RX Hombres', capacity: 20, registered: 14 },
    { id: 'rx-women', name: 'RX Mujeres', capacity: 20, registered: 12 },
    { id: 'scaled-men', name: 'Scaled Hombres', capacity: 20, registered: 18 },
    { id: 'scaled-women', name: 'Scaled Mujeres', capacity: 20, registered: 16 }
  ],
  mapsUrl: 'https://maps.app.goo.gl/unLjT3s9eNCSsKbMA',
  leaderboard: [
    { position: 1, participantId: 'participant-1', name: 'Valentina Rojas', points: 382 },
    { position: 2, participantId: 'participant-2', name: 'Martina Silva', points: 354 },
    { position: 3, participantId: 'participant-3', name: 'Alex González', points: 327 },
    { position: 4, participantId: 'participant-4', name: 'Camila Soto', points: 291 },
    { position: 5, participantId: 'participant-5', name: 'Diego Morales', points: 263 }
  ],
  wods: [
    {
      id: 'wod-1', name: 'WOD 1', date: '2026-08-08',
      activities: ['3 rondas por tiempo', '21-15-9 Thrusters', 'Pull-ups', '400 m de carrera'],
      leaderboard: [
        { name: 'Valentina Rojas', score: '08:42', points: 100 },
        { name: 'Martina Silva', score: '09:11', points: 95 },
        { name: 'Alex González', score: '09:38', points: 90 }
      ]
    },
    {
      id: 'wod-2', name: 'WOD 2', date: '2026-08-15',
      activities: ['AMRAP 15 minutos', '10 Deadlifts', '12 Box jumps', '14 Toes-to-bar'],
      leaderboard: [
        { name: 'Martina Silva', score: '8 + 24 reps', points: 100 },
        { name: 'Valentina Rojas', score: '8 + 16 reps', points: 95 },
        { name: 'Camila Soto', score: '7 + 38 reps', points: 90 }
      ]
    },
    {
      id: 'wod-3', name: 'WOD 3', date: '2026-08-22',
      activities: ['Por tiempo', '50 Wall balls', '30 Clean & Jerks', '20 Handstand push-ups'],
      leaderboard: [
        { name: 'Alex González', score: '12:05', points: 100 },
        { name: 'Diego Morales', score: '12:44', points: 95 },
        { name: 'Valentina Rojas', score: '13:02', points: 90 }
      ]
    },
    {
      id: 'wod-4', name: 'WOD 4', date: '2026-08-29',
      activities: ['Chipper final', '1.000 m de remo', '40 Dumbbell snatches', '20 Burpees over bar'],
      leaderboard: [
        { name: 'Valentina Rojas', score: '10:18', points: 100 },
        { name: 'Camila Soto', score: '10:51', points: 95 },
        { name: 'Martina Silva', score: '11:07', points: 90 }
      ]
    }
  ]
}
