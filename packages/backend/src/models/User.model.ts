import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email?: string
  password?: string
  telegramId?: string
  role: 'user' | 'admin'
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
    password: {
      type: String,
      select: false,
    },
    telegramId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
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
