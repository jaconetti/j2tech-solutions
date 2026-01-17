'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Zap, Award, HeadphonesIcon, Rocket, Smartphone, Cloud, ShoppingCart, Building2, Globe, LifeBuoy } from 'lucide-react'
import { Link } from '@/lib/navigation'
import AnimatedSection from '@/components/animated-section'
import AnimatedCounter from '@/components/animated-counter'
import AnimatedText from '@/components/animated-text'
import AnimatedCard from '@/components/animated-card'
import SocialProof from '@/components/social-proof'
import { motion } from 'framer-motion'

export default function HomePage() {
  const t = useTranslations('home')
  const tCommon = useTranslations('common')
  
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))]">
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-[rgb(var(--primary))]/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-[rgb(var(--secondary))]/5 blur-3xl" />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-6xl">
              <AnimatedText text={t('hero.title')} delay={0} />
            </h1>
            <p className="mb-8 text-lg text-[rgb(var(--muted))] lg:text-xl max-w-3xl mx-auto">
              <AnimatedText text={t('hero.subtitle')} delay={0.3} />
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button variant="gradient" size="lg">{tCommon('cta.start_project')}</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">{tCommon('cta.view_portfolio')}</Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold gradient-text lg:text-4xl">
                  <AnimatedCounter target={50} suffix="+" />
                </div>
                <div className="mt-1 text-sm text-[rgb(var(--muted))]">{t('hero.stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text lg:text-4xl">
                  <AnimatedCounter target={30} suffix="+" />
                </div>
                <div className="mt-1 text-sm text-[rgb(var(--muted))]">{t('hero.stats.clients')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text lg:text-4xl">
                  <AnimatedCounter target={98} suffix="%" />
                </div>
                <div className="mt-1 text-sm text-[rgb(var(--muted))]">{t('hero.stats.satisfaction')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection>
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">
              {t('benefits.title')}
            </h2>
          </AnimatedSection>
          
          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedCard delay={0.15} direction="left">
              <CardHeader>
                <motion.div 
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="h-6 w-6 text-[rgb(var(--primary))]" />
                </motion.div>
                <CardTitle>{t('benefits.speed.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('benefits.speed.description')}
                </CardDescription>
              </CardHeader>
            </AnimatedCard>
            
            <AnimatedCard delay={0.3} direction="up">
              <CardHeader>
                <motion.div 
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--secondary))]/10"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Award className="h-6 w-6 text-[rgb(var(--secondary))]" />
                </motion.div>
                <CardTitle>{t('benefits.quality.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('benefits.quality.description')}
                </CardDescription>
              </CardHeader>
            </AnimatedCard>
            
            <AnimatedCard delay={0.45} direction="right">
              <CardHeader>
                <motion.div 
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--accent))]/10"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <HeadphonesIcon className="h-6 w-6 text-[rgb(var(--accent))]" />
                </motion.div>
                <CardTitle>{t('benefits.support.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('benefits.support.description')}
                </CardDescription>
              </CardHeader>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Social Proof - Oculto até termos clientes reais */}
      {/* <SocialProof /> */}

      {/* Services */}
      <section className="bg-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                <AnimatedText text={t('services.title')} delay={0.1} />
              </h2>
              <p className="text-lg text-[rgb(var(--muted))]">
                <AnimatedText text={t('services.subtitle')} delay={0.3} />
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Rocket, key: 'mvp', delay: 0.15, direction: 'left' as const },
              { icon: Smartphone, key: 'apps', delay: 0.25, direction: 'up' as const },
              { icon: Cloud, key: 'saas', delay: 0.35, direction: 'right' as const },
              { icon: ShoppingCart, key: 'ecommerce', delay: 0.45, direction: 'left' as const },
              { icon: Building2, key: 'corporate', delay: 0.55, direction: 'up' as const },
              { icon: Globe, key: 'institutional', delay: 0.65, direction: 'right' as const },
              { icon: LifeBuoy, key: 'monthlySupport', delay: 0.75, direction: 'up' as const }
            ].map((service) => {
              const Icon = service.icon
              return (
                <AnimatedCard key={service.key} delay={service.delay} direction={service.direction}>
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="mb-4 h-10 w-10 text-[rgb(var(--primary))]" />
                    </motion.div>
                    <CardTitle>{t(`services.${service.key}.title`)}</CardTitle>
                    <p className="text-sm text-[rgb(var(--primary))]">{t(`services.${service.key}.price`)}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{t(`services.${service.key}.description`)}</CardDescription>
                  </CardContent>
                </AnimatedCard>
              )
            })}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="mt-12 text-center">
              <Link href="/services">
                <Button variant="gradient" size="lg">{tCommon('cta.view_all')}</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <div className="glass rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                <AnimatedText text={t('cta.title')} delay={0.2} />
              </h2>
              <p className="mb-8 text-lg text-[rgb(var(--muted))]">
                {t('cta.subtitle')}
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact">
                  <Button variant="gradient" size="lg">{tCommon('cta.contact_us')}</Button>
                </Link>
                <Link href="/calculator">
                  <Button variant="outline" size="lg">{tCommon('cta.calculate_budget')}</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
