'use client'

import { Rocket, Smartphone, Cloud, ShoppingCart, Building2, Globe, LifeBuoy, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/animated-section'
import AnimatedText from '@/components/animated-text'
import AnimatedCard from '@/components/animated-card'
import { motion } from 'framer-motion'

const servicesList = [
  { 
    key: 'mvp', 
    icon: Rocket
  },
  { 
    key: 'apps', 
    icon: Smartphone
  },
  { 
    key: 'saas', 
    icon: Cloud
  },
  { 
    key: 'ecommerce', 
    icon: ShoppingCart
  },
  { 
    key: 'corporate', 
    icon: Building2
  },
  { 
    key: 'institutional', 
    icon: Globe
  },
  { 
    key: 'monthlySupport', 
    icon: LifeBuoy
  }
]

export default function ServicesPage() {
  const t = useTranslations('services')
  const tCommon = useTranslations('common')
  
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
                <AnimatedText text={t('title')} delay={0} />
              </h1>
              <p className="text-lg text-[rgb(var(--muted))] lg:text-xl">
                <AnimatedText text={t('subtitle')} delay={0.3} />
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-16">
            {servicesList.map((service, index) => {
              const Icon = service.icon
              const direction = index % 2 === 0 ? 'left' : 'right'
              return (
                <AnimatedCard key={service.key} delay={index * 0.12} direction={direction as 'left' | 'right'}>
                  <div id={service.key}>
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--primary))]/10"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-8 w-8 text-[rgb(var(--primary))]" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <CardTitle className="text-2xl">{t(`${service.key}.title`)}</CardTitle>
                          <Badge variant="primary">{t(`${service.key}.price`)}</Badge>
                        </div>
                        <CardDescription className="text-base">{t(`${service.key}.desc`)}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div>
                        <h4 className="mb-4 font-semibold">{t('benefits')}</h4>
                        <ul className="space-y-2">
                          {(t.raw(`${service.key}.features`) as string[]).map((feature: string) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-[rgb(var(--muted))]">
                              <CheckCircle className="h-5 w-5 flex-shrink-0 text-[rgb(var(--secondary))]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-semibold">{t('technologies')}</h4>
                          <p className="text-sm text-[rgb(var(--muted))]">{t(`${service.key}.tech`)}</p>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-semibold">{t('timeline')}</h4>
                          <p className="text-sm text-[rgb(var(--muted))]">{t(`${service.key}.timeline`)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[rgb(var(--surface))] py-20">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <AnimatedSection delay={0.1}>
            <h2 className="mb-4 text-3xl font-bold">{t('cta_title')}</h2>
            <p className="mb-8 text-lg text-[rgb(var(--muted))]">
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button variant="gradient" size="lg">{t('contact_button')}</Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" size="lg">{t('calculate_button')}</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
