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
import { getOrganizationSchema } from '@/lib/structured-data'

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const baseUrl = 'https://j2tech.solutions'
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: locale === 'pt' 
        ? 'J2 Tech Solutions | Desenvolvimento de Software para Startups'
        : 'J2 Tech Solutions | Software Development for Startups',
      template: '%s | J2 Tech Solutions'
    },
    description: locale === 'pt'
      ? 'Desenvolvemos MVPs, Apps Mobile e SaaS para startups que querem escalar rápido. Entrega em 4-6 semanas com qualidade garantida.'
      : 'We develop MVPs, Mobile Apps and SaaS for startups that want to scale fast. Delivery in 4-6 weeks with guaranteed quality.',
    keywords: locale === 'pt'
      ? ['desenvolvimento de software', 'mvp', 'app mobile', 'saas', 'startup', 'nextjs', 'react', 'desenvolvimento web', 'tecnologia para startups']
      : ['software development', 'mvp', 'mobile app', 'saas', 'startup', 'nextjs', 'react', 'web development', 'startup technology'],
    authors: [{ name: 'J2 Tech Solutions' }],
    creator: 'J2 Tech Solutions',
    publisher: 'J2 Tech Solutions',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en'
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      alternateLocale: locale === 'pt' ? 'en_US' : 'pt_BR',
      url: `/${locale}`,
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
        alt: 'J2 Tech Solutions',
        type: 'image/png'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@j2techsolutions',
      creator: '@j2techsolutions',
      title: 'J2 Tech Solutions',
      description: locale === 'pt'
        ? 'Desenvolvimento de Software para Startups'
        : 'Software Development for Startups',
      images: ['/og-image.png']
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    icons: {
      icon: '/logo.jpg',
      shortcut: '/logo.jpg',
      apple: '/logo.jpg'
    },
    manifest: '/manifest.json',
    verification: {
      google: 'verification_token',
      yandex: 'verification_token',
      other: {
        'facebook-domain-verification': 'verification_token'
      }
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
  const organizationSchema = getOrganizationSchema(locale)

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
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
