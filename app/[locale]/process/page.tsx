import { Search, Map, Code, CheckCircle, Rocket } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import AnimatedSection from '@/components/animated-section'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations('process')
  
  return {
    title: t('title'),
    description: t('subtitle')
  }
}

const steps = [
  { 
    key: 'discovery', 
    icon: Search, 
    number: 1
  },
  { 
    key: 'planning', 
    icon: Map, 
    number: 2
  },
  { 
    key: 'development', 
    icon: Code, 
    number: 3
  },
  { 
    key: 'testing', 
    icon: CheckCircle, 
    number: 4
  },
  { 
    key: 'launch', 
    icon: Rocket, 
    number: 5
  }
]

export default function ProcessPage() {
  const t = useTranslations('process')
  
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold lg:text-5xl">{t('title')}</h1>
              <p className="text-lg text-[rgb(var(--muted))] lg:text-xl">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={step.key} delay={index * 0.1}>
                  <div className={`flex gap-6 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <Card className="flex-1">
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-sm font-semibold text-[rgb(var(--muted))]">
                          {t('step')} {step.number}
                        </span>
                        <span className="text-sm text-[rgb(var(--primary))]">{t(`${step.key}.duration`)}</span>
                      </div>
                      <CardTitle className="mb-2 text-2xl">{t(`${step.key}.title`)}</CardTitle>
                      <CardDescription className="text-base">{t(`${step.key}.description`)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-3 text-sm font-semibold">{t('what_we_do')}</h4>
                          <ul className="space-y-2 text-sm text-[rgb(var(--muted))]">
                            {(t.raw(`${step.key}.activities`) as string[]).map((activity: string) => (
                              <li key={activity} className="flex items-start gap-2">
                                <span className="text-[rgb(var(--primary))]">✓</span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-3 text-sm font-semibold">{t('deliverables')}</h4>
                          <ul className="space-y-2 text-sm text-[rgb(var(--muted))]">
                            {(t.raw(`${step.key}.deliverables`) as string[]).map((deliverable: string) => (
                              <li key={deliverable} className="flex items-start gap-2">
                                <span className="text-[rgb(var(--secondary))]">•</span>
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                </AnimatedSection>
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
            <Link href="/contact">
              <Button variant="gradient" size="lg">{t('contact_button')}</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
