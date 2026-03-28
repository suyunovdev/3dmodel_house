import { apiClient } from './client'
import type { PlanInput, GeneratePlanResponse, GenerateImageResponse } from '@ai-house-planner/shared'

export async function generatePlan(input: PlanInput): Promise<GeneratePlanResponse> {
  const { data } = await apiClient.post('/api/generate-plan', input)
  return data.data
}

export async function generateImage(prompt: string): Promise<GenerateImageResponse> {
  const { data } = await apiClient.post('/api/generate-image', { prompt })
  return data.data
}

export async function getProjects() {
  const { data } = await apiClient.get('/api/projects')
  return data.data
}

export async function saveProject(projectData: Record<string, unknown>) {
  const { data } = await apiClient.post('/api/projects', projectData)
  return data.data
}
