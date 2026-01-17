'use client'

import { Target, Eye, Heart } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/animated-section'
import AnimatedCounter from '@/components/animated-counter'
import AnimatedText from '@/components/animated-text'
import AnimatedCard from '@/components/animated-card'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const t = useTranslations('about')
  const tCommon = useTranslations('common')
  
  const stats = [
    { value: 50, suffix: '+', label: t('stats.projects') },
    { value: 30, suffix: '+', label: t('stats.clients') },
    { value: 5, suffix: '', label: t('stats.years') },
    { value: 98, suffix: '%', label: t('stats.satisfaction') }
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
              <AnimatedText text={t('title')} delay={0} />
            </h1>
            <p className="text-lg text-[rgb(var(--muted))] lg:text-xl">
              <AnimatedText text={t('subtitle')} delay={0.3} />
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl font-bold text-center">
              <AnimatedText text={t('history_title')} delay={0.1} />
            </h2>
            <p className="text-lg text-[rgb(var(--muted))] leading-relaxed">
              {t('history_content')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[rgb(var(--surface))] py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Target, title: t('mission_title'), content: t('mission_content'), delay: 0.15, direction: 'left' as const },
              { icon: Eye, title: t('vision_title'), content: t('vision_content'), delay: 0.3, direction: 'up' as const },
              { icon: Heart, title: t('values_title'), content: t('values_content'), delay: 0.45, direction: 'right' as const }
            ].map((item) => {
              const Icon = item.icon
              return (
                <AnimatedCard key={item.title} delay={item.delay} direction={item.direction} className="text-center h-full">
                  <CardHeader>
                    <motion.div 
                      className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-6 w-6 text-[rgb(var(--primary))]" />
                    </motion.div>
                    <CardTitle className="mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-base">{item.content}</CardDescription>
                  </CardHeader>
                </AnimatedCard>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.12}>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold gradient-text lg:text-5xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-[rgb(var(--muted))]">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgb(var(--surface))] py-20">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <AnimatedSection>
            <h2 className="mb-4 text-3xl font-bold">
              <AnimatedText text={t('cta_title')} delay={0.2} />
            </h2>
            <p className="mb-8 text-lg text-[rgb(var(--muted))]">
              {t('cta_subtitle')}
            </p>
            <Link href="/contact">
              <Button variant="gradient" size="lg">{tCommon('cta.contact_us')}</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
