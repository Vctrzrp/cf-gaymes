import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { HomePage } from '../pages/HomePage'

const AdminApp = lazy(() =>
  import('../admin/AdminApp').then(module => ({ default: module.AdminApp }))
)

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/adm/*"
        element={(
          <Suspense fallback={<span className="sr-only">Cargando administración...</span>}>
            <AdminApp />
          </Suspense>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
