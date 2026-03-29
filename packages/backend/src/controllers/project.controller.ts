import type { Request, Response } from 'express'
import { ProjectService } from '../services/project.service'
import { asyncHandler } from '../utils/asyncHandler'
import { sendSuccess, sendError } from '../utils/response'

export class ProjectController {
  private projectService = new ProjectService()

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await this.projectService.findAll({ page, limit }, req.userId)
    sendSuccess(res, result, 'Projects retrieved')
  })

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const project = await this.projectService.findById(req.params.id)
    if (!project) {
      sendError(res, 'Project not found', 404)
      return
    }
    sendSuccess(res, project, 'Project retrieved')
  })

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const project = await this.projectService.create({ ...req.body, userId: req.userId })
    sendSuccess(res, project, 'Project saved', 201)
  })

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    await this.projectService.delete(req.params.id, req.userId)
    sendSuccess(res, null, 'Project deleted')
  })
}
