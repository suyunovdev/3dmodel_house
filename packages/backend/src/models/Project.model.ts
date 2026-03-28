import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  userId?: string
  inputData: Record<string, unknown>
  resultJson: Record<string, unknown>
  imageUrl?: string
  explanation?: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: {
      type: String,
      index: true,
    },
    inputData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    resultJson: {
      type: Schema.Types.Mixed,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    explanation: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

ProjectSchema.index({ createdAt: -1 })
ProjectSchema.index({ userId: 1, createdAt: -1 })

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema)
