import { ProjectModel } from '../models/Project.model'
import { logger } from '../utils/logger'
import type { PaginationQuery } from '@ai-house-planner/shared'

export class ProjectService {
  async findAll(pagination: PaginationQuery) {
    const { page = 1, limit = 10 } = pagination
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      ProjectModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ProjectModel.countDocuments(),
    ])

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string) {
    return ProjectModel.findById(id).lean()
  }

  async create(data: {
    userId?: string
    inputData: Record<string, unknown>
    resultJson: Record<string, unknown>
    imageUrl?: string
  }) {
    const project = await ProjectModel.create(data)
    logger.info('Project saved', { id: project._id })
    return project
  }

  async delete(id: string) {
    const result = await ProjectModel.findByIdAndDelete(id)
    if (!result) throw new Error('Project not found')
    logger.info('Project deleted', { id })
  }
}
