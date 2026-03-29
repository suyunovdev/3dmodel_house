import { create } from 'zustand'
import { api } from '@/lib/api'

export interface Project {
  _id: string
  inputData: {
    area?: number
    floors?: number
    bedrooms?: number
    style?: string
  }
  imageUrl?: string
  explanation?: string
  createdAt: string
}

interface ProjectState {
  projects: Project[]
  total: number
  page: number
  totalPages: number
  isLoading: boolean
  fetchProjects: (page?: number) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  addProject: (project: Project) => void
}

export const useProjectStore = create<ProjectState>(set => ({
  projects: [],
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,

  fetchProjects: async (page = 1) => {
    set({ isLoading: true })
    try {
      const res = await api.get(`/projects?page=${page}&limit=12`) as any
      const { items, total, totalPages } = res.data
      set({ projects: items, total, page, totalPages, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  deleteProject: async (id: string) => {
    await api.delete(`/projects/${id}`)
    set(state => ({
      projects: state.projects.filter(p => p._id !== id),
      total: state.total - 1,
    }))
  },

  addProject: (project: Project) => {
    set(state => ({
      projects: [project, ...state.projects],
      total: state.total + 1,
    }))
  },
}))
