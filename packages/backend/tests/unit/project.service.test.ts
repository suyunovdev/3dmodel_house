import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProjectService } from '../../src/services/project.service'
import { AppError } from '../../src/middleware/error.middleware'

vi.mock('../../src/models/Project.model', () => ({
  ProjectModel: {
    find: vi.fn(),
    findById: vi.fn(),
    countDocuments: vi.fn(),
    create: vi.fn(),
  },
}))

import { ProjectModel } from '../../src/models/Project.model'

const mockProject = {
  _id: 'proj123',
  userId: 'user123',
  inputData: { area: 120, style: 'modern' },
  resultJson: {},
  createdAt: new Date(),
  deleteOne: vi.fn(),
}

describe('ProjectService', () => {
  let service: ProjectService

  beforeEach(() => {
    service = new ProjectService()
    vi.clearAllMocks()
  })

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const chainMock = {
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([mockProject]),
      }
      vi.mocked(ProjectModel.find).mockReturnValue(chainMock as any)
      vi.mocked(ProjectModel.countDocuments).mockResolvedValue(1)

      const result = await service.findAll({ page: 1, limit: 10 })

      expect(result.items).toHaveLength(1)
      expect(result.total).toBe(1)
      expect(result.totalPages).toBe(1)
    })

    it('should filter by userId when provided', async () => {
      const chainMock = {
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      }
      vi.mocked(ProjectModel.find).mockReturnValue(chainMock as any)
      vi.mocked(ProjectModel.countDocuments).mockResolvedValue(0)

      await service.findAll({ page: 1, limit: 10 }, 'user123')

      expect(ProjectModel.find).toHaveBeenCalledWith({ userId: 'user123' })
    })
  })

  describe('delete', () => {
    it('should throw 404 if project not found', async () => {
      vi.mocked(ProjectModel.findById).mockResolvedValue(null)

      await expect(service.delete('nonexistent', 'user123')).rejects.toThrow(AppError)
    })

    it('should throw 403 if wrong user tries to delete', async () => {
      vi.mocked(ProjectModel.findById).mockResolvedValue(mockProject as any)

      await expect(service.delete('proj123', 'other-user')).rejects.toThrow(AppError)
    })

    it('should delete project for owner', async () => {
      vi.mocked(ProjectModel.findById).mockResolvedValue(mockProject as any)

      await service.delete('proj123', 'user123')

      expect(mockProject.deleteOne).toHaveBeenCalledOnce()
    })
  })
})
