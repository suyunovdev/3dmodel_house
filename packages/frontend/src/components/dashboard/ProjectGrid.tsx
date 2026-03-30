import { Home, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from './ProjectCard'

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

interface ProjectGridProps {
  projects: Project[]
  hasFilters?: boolean
}

export function ProjectGrid({ projects, hasFilters = false }: ProjectGridProps) {
  if (projects.length === 0) {
    if (hasFilters) {
      return (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={36} className="text-white/20" />
          </div>
          <p className="text-white/50 text-lg mb-2">Natija topilmadi</p>
          <p className="text-white/30 text-sm">Qidiruv shartlarini o&apos;zgartirib ko&apos;ring</p>
        </div>
      )
    }

    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Home size={36} className="text-white/20" />
        </div>
        <p className="text-white/50 text-lg mb-2">Hali loyihalar yo&apos;q</p>
        <p className="text-white/30 text-sm mb-6">Birinchi uy rejangizdni yarating!</p>
        <Link href="/generate" className="btn-primary inline-flex items-center gap-2">
          <Plus size={16} />
          Yangi Reja Yaratish
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}
