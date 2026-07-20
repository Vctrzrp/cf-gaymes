import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import GroupsIcon from '@mui/icons-material/Groups'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { env } from '../config/env'
import { WodCreate, WodEdit, WodList } from './wods'
import { ParticipantCreate, ParticipantEdit, ParticipantList } from './participants'

const dataProvider = simpleRestProvider(env.apiBaseUrl)

export function AdminApp() {
  return (
    <Admin
      basename="/adm"
      dataProvider={dataProvider}
      title="Crossfit Gaymes Admin"
      requireAuth={false}
    >
      <Resource
        name="wods"
        options={{ label: 'WODs' }}
        icon={FitnessCenterIcon}
        list={WodList}
        edit={WodEdit}
        create={WodCreate}
        recordRepresentation="name"
      />
      <Resource
        name="participants"
        options={{ label: 'Participantes' }}
        icon={GroupsIcon}
        list={ParticipantList}
        edit={ParticipantEdit}
        create={ParticipantCreate}
        recordRepresentation={record => `${record.firstName} ${record.lastName}`}
      />
    </Admin>
  )
}
