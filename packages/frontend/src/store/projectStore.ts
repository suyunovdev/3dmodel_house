import { create } from 'zustand'
import { api } from '@/lib/api'

interface Project {
  _id: string
  inputData: {
    area?: number
    floors?: number
    bedrooms?: number
    style?: string
  }
  imageUrl?: string
  createdAt: string
}

interface ProjectState {
  projects: Project[]
  isLoading: boolean
  fetchProjects: () => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectStore = create<ProjectState>(set => ({
  projects: [],
  isLoading: false,

  fetchProjects: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/projects') as { data: { items: Project[] } }
      set({ projects: response.data.items, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  deleteProject: async (id: string) => {
    try {
      await api.delete(`/projects/${id}`)
      set(state => ({
        projects: state.projects.filter(p => p._id !== id),
      }))
    } catch (error) {
      throw error
    }
  },
}))
