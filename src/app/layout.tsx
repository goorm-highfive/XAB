import type { Metadata } from 'next'

import '~/styles/globals.css'

export const metadata: Metadata = {
  title: 'XAB',
  description: 'A/B 테스트를 집단지성으로!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}
