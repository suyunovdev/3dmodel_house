import { Card } from '@/components/ui/Card'
import { MessageSquare } from 'lucide-react'

interface ExplanationProps {
  text: string
}

export function Explanation({ text }: ExplanationProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
          <MessageSquare size={16} className="text-primary-400" />
        </div>
        <h3 className="text-white font-bold">AI Tavsifi</h3>
      </div>
      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
    </Card>
  )
}
