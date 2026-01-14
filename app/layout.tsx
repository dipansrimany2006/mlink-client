import type { Metadata } from 'next'
import { Geist, Geist_Mono, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Web3Provider } from '@/providers/Web3Provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _dmSerifDisplay = DM_Serif_Display({ 
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: 'Mlinks SDK for Mantle Network',
  description:
    'Mlinks SDK is a lightweight, framework-agnostic toolkit for building and executing mlink flows on Mantle Network — with server adapters, React hooks, and type-safe utilities.',
  keywords: [
    'Mlinks',
    'mlink',
    'Mantle',
    'Mantle Network',
    'SDK',
    'onchain UX',
    'TypeScript',
    'React',
    'Next.js',
  ],
  generator: 'Mlinks SDK',
  icons: {
    icon: [
      {
        url: '/mlinks-logo.png',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Mlinks SDK for Mantle Network',
    description:
      'Standard way to build, validate, and execute mlinks on Mantle — with server adapters, React components, and utilities.',
    images: ['/mlinks-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mlinks SDK for Mantle Network',
    description:
      'Framework-agnostic developer toolkit for creating mlink flows on Mantle using TypeScript and React.',
    images: ['/mlinks-logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Web3Provider>
          {children}
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  )
}
