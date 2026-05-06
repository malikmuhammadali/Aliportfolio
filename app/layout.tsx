import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code'
})

export const metadata: Metadata = {
  title: 'Malik Muhammad Ali | AI/ML & Automation Engineer',
  description: 'Building intelligent automation systems with LLMs, RAG pipelines, and real-time AI workflows. AI/ML Engineer specializing in LangChain, FastAPI, and production-level AI solutions.',
  keywords: ['AI Engineer', 'ML Engineer', 'LangChain', 'RAG', 'FastAPI', 'Automation', 'Python', 'Machine Learning'],
  authors: [{ name: 'Malik Muhammad Ali' }],
  openGraph: {
    title: 'Malik Muhammad Ali | AI/ML & Automation Engineer',
    description: 'Building intelligent automation systems with LLMs, RAG pipelines, and real-time AI workflows.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malik Muhammad Ali | AI/ML & Automation Engineer',
    description: 'Building intelligent automation systems with LLMs, RAG pipelines, and real-time AI workflows.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
