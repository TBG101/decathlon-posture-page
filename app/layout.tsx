import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DECATHLON DIGITAL - Analyse Posturale & Prévention des Blessures',
  description: 'Découvrez votre profil de santé posturale avec notre questionnaire intelligent. Recevez des exercices personnalisés pour améliorer votre posture, prévenir les blessures et optimiser vos performances sportives.',
  keywords: ['posture', 'prévention blessures', 'analyse posturale', 'exercices personnalisés', 'santé sportive', 'décathlon'],
  metadataBase: new URL('https://decathlon-posture.vercel.app'),
  openGraph: {
    title: 'DECATHLON DIGITAL - Analyse Posturale & Prévention des Blessures',
    description: 'Questionnaire d\'analyse posturale personnalisée avec recommandations d\'exercices adaptés à votre profil sportif.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'DECATHLON DIGITAL',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DECATHLON DIGITAL - Analyse Posturale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DECATHLON DIGITAL - Analyse Posturale & Prévention des Blessures',
    description: 'Découvrez votre profil de santé posturale et recevez des exercices personnalisés.',
    images: ['/og-image.png'],
  },
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
