import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '문신의 — 포트폴리오',
  description: '영남대학교 화학공학부 에너지화공전공 문신의의 포트폴리오입니다.',
  keywords: ['문신의', '화학공학', '에너지', '포트폴리오', '연구'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
