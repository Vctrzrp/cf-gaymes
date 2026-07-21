import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import GroupsIcon from '@mui/icons-material/Groups'
import { Admin, CustomRoutes, fetchUtils, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { Route } from 'react-router-dom'
import { env } from '../config/env'
import { WodCreate, WodEdit, WodList } from './wods'
import { ParticipantCreate, ParticipantEdit, ParticipantList } from './participants'
import { AdminLayout } from './AdminLayout'
import { adminDarkTheme, adminLightTheme } from './adminTheme'
import { authProvider, getAdminToken } from './authProvider'
import { AdminLoginPage } from './AdminLoginPage'
import { i18nProvider } from './i18nProvider'
import { SummaryPage } from './SummaryPage'

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const headers = new Headers(options.headers ?? { Accept: 'application/json' })
  const token = getAdminToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetchUtils.fetchJson(url, { ...options, headers })
}

const dataProvider = simpleRestProvider(env.apiBaseUrl, httpClient)

export function AdminApp() {
  return (
    <Admin
      basename="/adm"
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={AdminLoginPage}
      i18nProvider={i18nProvider}
      title="Crossfit Gaymes Admin"
      layout={AdminLayout}
      theme={adminLightTheme}
      darkTheme={adminDarkTheme}
      defaultTheme={document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'}
    >
      <CustomRoutes>
        <Route path="/summary" element={<SummaryPage />} />
      </CustomRoutes>
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
