import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI House Planner — Uy rejangizni AI bilan yarating',
  description: 'Sun\'iy intellekt yordamida uy rejasi, 2D plan va dizayn yarating',
  keywords: ['uy rejasi', 'AI', 'house planner', 'floor plan', '2D plan'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </body>
    </html>
  )
}
