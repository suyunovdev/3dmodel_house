import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email?: string
  telegramId?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    telegramId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

UserSchema.index({ email: 1 })
UserSchema.index({ telegramId: 1 })

export const UserModel = mongoose.model<IUser>('User', UserSchema)
