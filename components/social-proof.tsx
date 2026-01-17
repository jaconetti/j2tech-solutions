'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from './animated-section'

const clients = [
  { name: 'Client 1', logo: 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=Client+1' },
  { name: 'Client 2', logo: 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=Client+2' },
  { name: 'Client 3', logo: 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=Client+3' },
  { name: 'Client 4', logo: 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=Client+4' },
  { name: 'Client 5', logo: 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=Client+5' },
  { name: 'Client 6', logo: 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=Client+6' }
]

export default function SocialProof() {
  const t = useTranslations('home.socialProof')

  return (
    <section className="py-16 lg:py-24 bg-[rgb(var(--surface))]">
      <div className="container mx-auto max-w-7xl px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-lg text-[rgb(var(--muted))] font-medium">
              {t('trusted')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {clients.map((client, index) => (
              <div 
                key={client.name}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
