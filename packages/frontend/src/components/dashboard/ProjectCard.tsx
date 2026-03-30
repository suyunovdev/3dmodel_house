'use client'

import Link from 'next/link'
import { Calendar, Home, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useProjectStore } from '@/store/projectStore'
import toast from 'react-hot-toast'

interface ProjectCardProps {
  project: {
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
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { deleteProject } = useProjectStore()
  const { inputData } = project
  const date = new Date(project.createdAt).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('Bu loyihani o\'chirishni xohlaysizmi?')) return
    try {
      await deleteProject(project._id)
      toast.success('Loyiha o\'chirildi')
    } catch {
      toast.error('O\'chirishda xatolik')
    }
  }

  return (
    <Link href={`/result/${project._id}`}>
      <Card hover className="group relative">
        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-lg bg-red-500/0 hover:bg-red-500/20 text-white/0 group-hover:text-red-400 group-hover:bg-red-500/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          title="O'chirish"
        >
          <Trash2 size={13} />
        </button>

        {project.imageUrl ? (
          <div className="h-36 rounded-xl overflow-hidden mb-4 bg-white/5">
            <img
              src={project.imageUrl}
              alt="House plan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-36 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 mb-4 flex items-center justify-center">
            <Home size={40} className="text-primary-400/50" />
          </div>
        )}

        <div className="flex items-start justify-between mb-3">
          <Badge variant="primary">{inputData.style?.toUpperCase() ?? 'N/A'}</Badge>
          <span className="text-white/40 text-xs flex items-center gap-1">
            <Calendar size={10} />
            {date}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-white font-bold text-sm">{inputData.area ?? '?'}</div>
            <div className="text-white/40 text-xs">m²</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-white font-bold text-sm">{inputData.floors ?? '?'}</div>
            <div className="text-white/40 text-xs">qavat</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-white font-bold text-sm">{inputData.bedrooms ?? '?'}</div>
            <div className="text-white/40 text-xs">xona</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
