import { useProjectStore } from '@/store/projectStore'

export function useProjects() {
  const { projects, isLoading, fetchProjects, deleteProject } = useProjectStore()

  return {
    projects,
    isLoading,
    refresh: fetchProjects,
    remove: deleteProject,
  }
}
