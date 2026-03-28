import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 90000, // 90s for AI
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message ?? error.message ?? 'Unknown error'
    throw new Error(message)
  }
)
