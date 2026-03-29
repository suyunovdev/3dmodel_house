'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.email) e.email = 'Email kiritilishi shart'
    if (!form.password) e.password = 'Parol kiritilishi shart'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await login(form.email, form.password)
      toast.success('Muvaffaqiyatli kirdingiz!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Kirish xatoligi')
    }
  }

  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold">AI</div>
            <span className="text-white font-bold text-xl">House Planner</span>
          </Link>
          <h1 className="text-3xl font-bold text-white">Kirish</h1>
          <p className="text-white/50 mt-2">Hisobingizga kiring</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            error={errors.email}
            required
          />

          <div className="relative">
            <Input
              label="Parol"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-9 text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full mt-2">
            Kirish
          </Button>

          <p className="text-center text-white/50 text-sm">
            Hisob yo&apos;qmi?{' '}
            <Link href="/register" className="text-primary-400 hover:text-primary-300 font-medium">
              Ro&apos;yxatdan o&apos;ting
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
