import type { AuthProvider } from 'react-admin'
import { env } from '../config/env'

const TOKEN_KEY = 'crossfit_gaymes_admin_token'
const IDENTITY_KEY = 'crossfit_gaymes_admin_identity'
const ATTEMPTS_KEY = 'crossfit_gaymes_admin_attempts'
const SESSION_DURATION_MS = 5 * 60 * 1000
let expiryTimer: number | undefined

interface JwtPayload {
  exp?: number
  iat?: number
}

const readJwtPayload = (token: string): JwtPayload | null => {
  try {
    const encoded = token.split('.')[1]
    const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/')
    const padding = '='.repeat((4 - normalized.length % 4) % 4)
    return JSON.parse(atob(normalized + padding)) as JwtPayload
  } catch {
    return null
  }
}

const getSessionExpiration = (token: string) => {
  const payload = readJwtPayload(token)
  if (!payload?.exp) return null

  const jwtExpiration = payload.exp * 1000
  const maximumExpiration = payload.iat
    ? payload.iat * 1000 + SESSION_DURATION_MS
    : jwtExpiration

  return Math.min(jwtExpiration, maximumExpiration)
}

const clearExpiryTimer = () => {
  if (expiryTimer !== undefined) window.clearTimeout(expiryTimer)
  expiryTimer = undefined
}

const clearAuth = () => {
  clearExpiryTimer()
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(IDENTITY_KEY)
}

const scheduleSessionExpiration = (token: string) => {
  clearExpiryTimer()
  const expiration = getSessionExpiration(token)
  if (!expiration) return false

  const remaining = expiration - Date.now()
  if (remaining <= 0) {
    clearAuth()
    return false
  }

  expiryTimer = window.setTimeout(() => {
    clearAuth()
    sessionStorage.removeItem(ATTEMPTS_KEY)
    window.location.replace('/adm/login')
  }, remaining)
  return true
}

const registerFailedAttempt = () => {
  const attempts = Number(sessionStorage.getItem(ATTEMPTS_KEY) ?? 0) + 1

  if (attempts >= 2) {
    sessionStorage.removeItem(ATTEMPTS_KEY)
    clearAuth()
    window.location.replace('/')
    throw new Error('Se alcanzó el máximo de intentos. Serás redirigido al inicio.')
  }

  sessionStorage.setItem(ATTEMPTS_KEY, String(attempts))
  throw new Error('Credenciales incorrectas. Te queda 1 intento.')
}

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    let response: Response

    try {
      response = await fetch(`${env.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
    } catch {
      throw new Error('No fue posible comunicarse con el servidor de autenticación.')
    }

    if (response.status === 401 || response.status === 403) registerFailedAttempt()

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.message ?? 'El servidor de autenticación no está disponible.')
    }

    const data = await response.json()
    if (!data.token) throw new Error('La respuesta de autenticación no contiene un token válido.')

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(IDENTITY_KEY, JSON.stringify({
      id: data.user?.id ?? data.user?.username ?? username,
      fullName: data.user?.name ?? data.user?.username ?? username
    }))
    sessionStorage.removeItem(ATTEMPTS_KEY)
    scheduleSessionExpiration(data.token)
  },

  async logout() {
    const token = localStorage.getItem(TOKEN_KEY)
    try {
      if (token) {
        await fetch(`${env.apiBaseUrl}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        })
      }
    } catch {
      // La sesión local debe cerrarse incluso si el backend dejó de responder.
    } finally {
      clearAuth()
      sessionStorage.removeItem(ATTEMPTS_KEY)
    }
  },

  async checkAuth() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token || !scheduleSessionExpiration(token)) {
      throw new Error('Debes iniciar sesión para acceder a la administración.')
    }
  },

  async checkError(error) {
    if (error.status === 401 || error.status === 403) {
      clearAuth()
      throw error
    }
  },

  async getIdentity() {
    const identity = localStorage.getItem(IDENTITY_KEY)
    if (!identity) throw new Error('No existe una sesión administrativa.')
    return JSON.parse(identity)
  },

  async getPermissions() {
    return 'admin'
  }
}

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY)
