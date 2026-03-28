import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const apiClient = axios.create({
  baseURL: process.env.BACKEND_URL ?? 'http://localhost:3001',
  timeout: 60000, // 60s for AI generation
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message ?? error.message
    console.error(`API Error: ${message}`)
    throw new Error(message)
  }
)
