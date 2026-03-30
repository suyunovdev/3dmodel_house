import { ProjectModel } from '../models/Project.model'
import { logger } from '../utils/logger'
import { AppError } from '../middleware/error.middleware'
import type { PaginationQuery } from '@ai-house-planner/shared'

export class ProjectService {
  async findAll(pagination: PaginationQuery, userId?: string, search?: string, style?: string) {
    const { page = 1, limit = 10 } = pagination
    const skip = (page - 1) * limit

    const filter: Record<string, unknown> = userId ? { userId } : {}
    if (style) filter['inputData.style'] = { $regex: style, $options: 'i' }
    if (search) {
      filter['$or'] = [
        { 'inputData.style': { $regex: search, $options: 'i' } },
        { explanation: { $regex: search, $options: 'i' } },
      ]
    }

    const [items, total] = await Promise.all([
      ProjectModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ProjectModel.countDocuments(filter),
    ])

    return { items, total, page, totalPages: Math.ceil(total / limit) }
  }

  async findById(id: string) {
    return ProjectModel.findById(id).lean()
  }

  async create(data: {
    userId?: string
    inputData: Record<string, unknown>
    resultJson: Record<string, unknown>
    imageUrl?: string
    explanation?: string
  }) {
    const project = await ProjectModel.create(data)
    logger.info('Project saved', { id: project._id })
    return project
  }

  async delete(id: string, userId?: string) {
    const project = await ProjectModel.findById(id)
    if (!project) throw new AppError('Loyiha topilmadi', 404)
    if (userId && project.userId && project.userId !== userId) {
      throw new AppError('Bu loyihani o\'chirish huquqingiz yo\'q', 403)
    }
    await project.deleteOne()
    logger.info('Project deleted', { id })
  }
}
