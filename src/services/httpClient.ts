import axios from 'axios'
import { env } from '../config/env'

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpClient.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'No fue posible comunicarse con el servidor'
    return Promise.reject(new Error(message))
  }
)
