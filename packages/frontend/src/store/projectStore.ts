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
  search: string
  styleFilter: string
  fetchProjects: (page?: number, search?: string, style?: string) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  addProject: (project: Project) => void
  setSearch: (search: string) => void
  setStyleFilter: (style: string) => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,
  search: '',
  styleFilter: '',

  fetchProjects: async (page = 1, search?: string, style?: string) => {
    const q = search ?? get().search
    const s = style ?? get().styleFilter
    set({ isLoading: true })
    try {
      const params = new URLSearchParams({ page: String(page), limit: '12' })
      if (q) params.set('search', q)
      if (s) params.set('style', s)
      const res = await api.get(`/projects?${params}`) as any
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

  setSearch: (search: string) => set({ search }),
  setStyleFilter: (styleFilter: string) => set({ styleFilter }),
}))
