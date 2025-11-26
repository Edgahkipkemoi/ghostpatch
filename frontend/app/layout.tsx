import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🧟 GhostPatch - Frankenstein Code Generator',
  description: 'Stitch together code from different languages into hybrid programs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-ghost-bg text-ghost-green">{children}</body>
    </html>
  )
}
