import '../globals.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { routing } from '@/i18n/routing'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: {
      default: locale === 'pt' 
        ? 'J2 Tech Solutions | Desenvolvimento de Software para Startups'
        : 'J2 Tech Solutions | Software Development for Startups',
      template: '%s | J2 Tech Solutions'
    },
    description: locale === 'pt'
      ? 'Desenvolvemos MVPs, Apps Mobile e SaaS para startups que querem escalar rápido. Entrega em 4-6 semanas com qualidade garantida.'
      : 'We develop MVPs, Mobile Apps and SaaS for startups that want to scale fast. Delivery in 4-6 weeks with guaranteed quality.',
    keywords: ['software development', 'mvp', 'mobile app', 'saas', 'startup', 'nextjs', 'react'],
    authors: [{ name: 'J2 Tech Solutions' }],
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: '/',
      siteName: 'J2 Tech Solutions',
      title: locale === 'pt'
        ? 'J2 Tech Solutions | Desenvolvimento de Software para Startups'
        : 'J2 Tech Solutions | Software Development for Startups',
      description: locale === 'pt'
        ? 'Transformamos ideias em produtos digitais de sucesso'
        : 'We transform ideas into successful digital products',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'J2 Tech Solutions'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'J2 Tech Solutions',
      description: locale === 'pt'
        ? 'Desenvolvimento de Software para Startups'
        : 'Software Development for Startups',
      images: ['/og-image.png']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg'
    }
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
