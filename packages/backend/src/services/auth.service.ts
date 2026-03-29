import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User.model'
import { env } from '../config/env'
import { AppError } from '../middleware/error.middleware'

interface RegisterDto {
  name: string
  email: string
  password: string
}

interface LoginDto {
  email: string
  password: string
}

interface TokenPayload {
  userId: string
  email: string
}

export class AuthService {
  private generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' })
  }

  async register(dto: RegisterDto) {
    const existing = await UserModel.findOne({ email: dto.email.toLowerCase() })
    if (existing) {
      throw new AppError('Bu email allaqachon ro\'yxatdan o\'tgan', 409)
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12)

    const user = await UserModel.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      password: hashedPassword,
    })

    const token = this.generateToken({ userId: user._id.toString(), email: user.email! })

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    }
  }

  async login(dto: LoginDto) {
    const user = await UserModel.findOne({ email: dto.email.toLowerCase() }).select('+password')
    if (!user || !user.password) {
      throw new AppError('Email yoki parol noto\'g\'ri', 401)
    }

    const isMatch = await bcrypt.compare(dto.password, user.password)
    if (!isMatch) {
      throw new AppError('Email yoki parol noto\'g\'ri', 401)
    }

    const token = this.generateToken({ userId: user._id.toString(), email: user.email! })

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    }
  }

  async getMe(userId: string) {
    const user = await UserModel.findById(userId).lean()
    if (!user) throw new AppError('Foydalanuvchi topilmadi', 404)
    return user
  }
}
