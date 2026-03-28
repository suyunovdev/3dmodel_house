'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Loader } from '@/components/ui/Loader'

interface PlanImageProps {
  imageUrl: string
}

export function PlanImage({ imageUrl }: PlanImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card>
      <h3 className="text-white font-bold mb-4">AI tomonidan yaratilgan rasm</h3>
      <div className="relative rounded-xl overflow-hidden bg-white/5 min-h-[250px] flex items-center justify-center">
        {isLoading && <Loader text="Rasm yuklanmoqda..." />}
        <Image
          src={imageUrl}
          alt="Generated house plan"
          width={800}
          height={450}
          className="w-full object-cover rounded-xl"
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>
    </Card>
  )
}
