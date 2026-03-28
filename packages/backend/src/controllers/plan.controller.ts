import type { Request, Response } from 'express'
import { PlanService } from '../services/plan.service'
import { asyncHandler } from '../utils/asyncHandler'
import { sendSuccess } from '../utils/response'
import type { GeneratePlanRequest } from '@ai-house-planner/shared'

export class PlanController {
  private planService = new PlanService()

  generate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input: GeneratePlanRequest = req.body
    const result = await this.planService.generatePlan(input)
    sendSuccess(res, result, 'Plan generated successfully', 201)
  })
}
