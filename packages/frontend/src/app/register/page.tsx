'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name || form.name.length < 2) e.name = 'Ism kamida 2 ta harf bo\'lishi kerak'
    if (!form.email) e.email = 'Email kiritilishi shart'
    if (!form.password || form.password.length < 6) e.password = 'Parol kamida 6 ta belgi bo\'lishi kerak'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await register(form.name, form.email, form.password)
      toast.success('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Ro\'yxatdan o\'tish xatoligi')
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
          <h1 className="text-3xl font-bold text-white">Ro&apos;yxatdan o&apos;tish</h1>
          <p className="text-white/50 mt-2">Bepul hisob yarating</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          <Input
            label="To'liq ism"
            type="text"
            placeholder="Ism Familiya"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            error={errors.name}
            required
          />

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
              placeholder="Kamida 6 ta belgi"
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
            Ro&apos;yxatdan o&apos;tish
          </Button>

          <p className="text-center text-white/50 text-sm">
            Hisob bormi?{' '}
            <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium">
              Kiring
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
