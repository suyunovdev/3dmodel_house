import { Brain, Zap, Download, History, Palette, Smartphone } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const features = [
  {
    icon: Brain,
    title: 'AI bilan yaratish',
    description: 'GPT-4o modelidan foydalanib professional arxitektura rejalari yaratiladi',
  },
  {
    icon: Zap,
    title: '30 soniyada tayyor',
    description: 'Murakkab hisob-kitoblarni AI o\'zi bajaradi — siz faqat natijani kutasiz',
  },
  {
    icon: Palette,
    title: '5 xil uslub',
    description: 'Modern, Classic, Minimalist, Industrial va Scandinavian uslublarida',
  },
  {
    icon: Download,
    title: 'Yuklab olish',
    description: 'Reja va tavsifni PDF formatida yuklab olish imkoniyati',
  },
  {
    icon: History,
    title: 'Tarix saqlash',
    description: 'Barcha yaratilgan loyihalar dashboard\'da saqlanib qoladi',
  },
  {
    icon: Smartphone,
    title: 'Telegram bot',
    description: 'Telegram orqali ham uy rejalari yaratish mumkin — qulay va tez',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Nima uchun <span className="gradient-text">bizni tanlash</span> kerak?
          </h2>
          <p className="text-white/60 text-lg">
            Zamonaviy AI texnologiyasi bilan professional natijalar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(feature => (
            <Card key={feature.title} hover>
              <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-primary-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
