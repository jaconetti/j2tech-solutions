'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { calculatorLeadSchema } from '@/lib/schemas'
import { calculateEstimate, formatCurrency } from '@/lib/calculator'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Calculator as CalcIcon, Rocket, Smartphone, Cloud, ShoppingCart, Building2, Globe, Headphones } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const projectTypesData = [
  { key: 'mvp', icon: Rocket },
  { key: 'app_mobile', icon: Smartphone },
  { key: 'saas', icon: Cloud },
  { key: 'ecommerce', icon: ShoppingCart },
  { key: 'corporate', icon: Building2 },
  { key: 'institutional', icon: Globe },
  { key: 'monthly_support', icon: Headphones }
]

export default function CalculatorPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('calculator')
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [complexity, setComplexity] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [supportHours, setSupportHours] = useState('')
  const [estimate, setEstimate] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isMonthlySupport = projectType === 'monthly_support'

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(calculatorLeadSchema.omit({ projectType: true, complexity: true, features: true, deadline: true, estimateMin: true, estimateMax: true, timeline: true }))
  })

  const toggleFeature = (feature: string) => {
    setFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const handleCalculate = () => {
    const result = calculateEstimate({
      projectType: projectType as any,
      complexity: complexity as any,
      features,
      deadline: deadline as any,
      supportHours: supportHours as any
    })
    setEstimate(result)
    analytics.calculateBudget({ min: result?.min ?? 0, max: result?.max ?? 0 })
    setStep(isMonthlySupport ? 3 : 5)
  }

  const onSubmitLead = async (data: any) => {
    setIsSubmitting(true)
    try {
      await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          projectType,
          complexity,
          features,
          deadline,
          estimateMin: estimate?.min ?? 0,
          estimateMax: estimate?.max ?? 0,
          timeline: estimate?.timeline ?? ''
        })
      })
      alert('Proposta solicitada com sucesso! Entraremos em contato em breve.')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <CalcIcon className="mx-auto mb-4 h-16 w-16 text-[rgb(var(--primary))]" />
            <h1 className="mb-4 text-4xl font-bold">{t('title')}</h1>
            <p className="text-lg text-[rgb(var(--muted))]">
              {t('subtitle')}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {(isMonthlySupport ? [1, 2] : [1, 2, 3, 4]).map(i => (
              <div
                key={i}
                className={`h-2 w-16 rounded-full transition-colors ${
                  step >= i ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--card))]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {step === 1 && t('step1.title')}
                {step === 2 && (isMonthlySupport ? t('step_support.title') : t('step2.title'))}
                {step === 3 && !isMonthlySupport && t('step3.title')}
                {step === 3 && isMonthlySupport && t('result.title')}
                {step === 4 && t('step4.title')}
                {step === 5 && t('result.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {projectTypesData.map(type => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.key}
                        onClick={() => setProjectType(type.key)}
                        className={`flex items-center gap-4 rounded-lg border-2 p-4 transition-all ${
                          projectType === type.key
                            ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                            : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                        }`}
                      >
                        <Icon className="h-8 w-8 flex-shrink-0" />
                        <span className="font-medium">{t(`step1.${type.key}`)}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {step === 2 && !isMonthlySupport && (
                <div className="space-y-4">
                  {[
                    { key: 'simple' },
                    { key: 'medium' },
                    { key: 'complex' }
                  ].map(comp => (
                    <button
                      key={comp.key}
                      onClick={() => setComplexity(comp.key)}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        complexity === comp.key
                          ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                      }`}
                    >
                      <div className="mb-1 font-semibold">{t(`step2.${comp.key}`)}</div>
                      <div className="text-sm text-[rgb(var(--muted))]">{t(`step2.${comp.key}_desc`)}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && isMonthlySupport && (
                <div className="space-y-4">
                  <p className="mb-4 text-sm text-[rgb(var(--muted))]">{t('step_support.subtitle')}</p>
                  {[
                    { key: '10', label: '10h', desc: t('step_support.10h_desc') },
                    { key: '20', label: '20h', desc: t('step_support.20h_desc') },
                    { key: '40', label: '40h', desc: t('step_support.40h_desc') },
                    { key: 'custom', label: t('step_support.custom'), desc: t('step_support.custom_desc') }
                  ].map(option => (
                    <button
                      key={option.key}
                      onClick={() => setSupportHours(option.key)}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        supportHours === option.key
                          ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                      }`}
                    >
                      <div className="mb-1 font-semibold">{option.label}</div>
                      <div className="text-sm text-[rgb(var(--muted))]">{option.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    'auth', 'admin', 'payments', 'notifications',
                    'chat', 'api', 'upload', 'analytics'
                  ].map(feature => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`rounded-lg border-2 p-3 text-left text-sm transition-all ${
                        features.includes(feature)
                          ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                      }`}
                    >
                      {t(`step3.${feature}`)}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {[
                    { key: 'urgent' },
                    { key: 'normal' },
                    { key: 'flexible' }
                  ].map(dead => (
                    <button
                      key={dead.key}
                      onClick={() => setDeadline(dead.key)}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        deadline === dead.key
                          ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                      }`}
                    >
                      <div className="mb-1 font-semibold">{t(`step4.${dead.key}`)}</div>
                      <div className="text-sm text-[rgb(var(--muted))]">{t(`step4.${dead.key}_desc`)}</div>
                    </button>
                  ))}
                </div>
              )}

              {(step === 5 || (step === 3 && isMonthlySupport)) && estimate && (
                <div className="space-y-6">
                  <div className="rounded-xl bg-gradient-to-r from-[rgb(var(--primary))]/20 to-[rgb(var(--secondary))]/20 p-8 text-center">
                    <div className="mb-2 text-sm font-semibold text-[rgb(var(--muted))]">
                      {isMonthlySupport ? t('result.monthly_price') : t('result.price_range')}
                    </div>
                    <div className="text-4xl font-bold gradient-text">
                      {isMonthlySupport 
                        ? `${formatCurrency(estimate.min, locale)}/mês`
                        : `${formatCurrency(estimate.min, locale)} - ${formatCurrency(estimate.max, locale)}`
                      }
                    </div>
                    {!isMonthlySupport && (
                      <div className="mt-4 text-sm text-[rgb(var(--muted))]">
                        {t('result.timeline')}: {estimate.timeline} {t('result.weeks')}
                      </div>
                    )}
                    {isMonthlySupport && supportHours !== 'custom' && (
                      <div className="mt-4 text-sm text-[rgb(var(--muted))]">
                        {supportHours}h mensais inclusas
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-[rgb(var(--muted))]">
                    <p className="mb-2 font-semibold">{t('result.based_on')}</p>
                    <ul className="space-y-1">
                      <li>• {t('step1.title')}: {t(`step1.${projectType}`)}</li>
                      {!isMonthlySupport && (
                        <>
                          <li>• {t('step2.title')}: {t(`step2.${complexity}`)}</li>
                          <li>• {features.length} {t('step3.title').toLowerCase()}</li>
                          <li>• {t('step4.title')}: {t(`step4.${deadline}`)}</li>
                        </>
                      )}
                      {isMonthlySupport && supportHours !== 'custom' && (
                        <li>• Pacote de {supportHours} horas mensais</li>
                      )}
                    </ul>
                  </div>

                  <Card className="bg-[rgb(var(--surface))]">
                    <CardHeader>
                      <CardTitle className="text-xl">{t('result.cta_title')}</CardTitle>
                      <p className="text-sm text-[rgb(var(--muted))]">{t('result.cta_subtitle')}</p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-4">
                        <div>
                          <Label htmlFor="name">{t('result.name')}</Label>
                          <Input id="name" {...register('name')} className="mt-2" />
                          {errors?.name && <p className="mt-1 text-sm text-red-500">{String(errors?.name?.message ?? '')}</p>}
                        </div>
                        <div>
                          <Label htmlFor="email">{t('result.email')}</Label>
                          <Input id="email" type="email" {...register('email')} className="mt-2" />
                          {errors?.email && <p className="mt-1 text-sm text-red-500">{String(errors?.email?.message ?? '')}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">{t('result.phone')}</Label>
                          <Input id="phone" {...register('phone')} className="mt-2" />
                        </div>
                        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? t('result.submitting') : t('result.submit')}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && ((step < 5 && !isMonthlySupport) || (step < 3 && isMonthlySupport)) && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('result.previous')}
                  </Button>
                )}
                {((step === 5 && !isMonthlySupport) || (step === 3 && isMonthlySupport)) && (
                  <Button variant="outline" onClick={() => { setStep(1); setEstimate(null); setProjectType(''); setSupportHours('') }}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('result.recalculate')}
                  </Button>
                )}
                <div className="ml-auto" />
                {step < 4 && !isMonthlySupport && (
                  <Button
                    variant="gradient"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !projectType) ||
                      (step === 2 && !complexity) ||
                      (step === 3 && features.length === 0)
                    }
                  >
                    {t('result.next')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {step === 2 && isMonthlySupport && (
                  <Button
                    variant="gradient"
                    onClick={handleCalculate}
                    disabled={!supportHours}
                  >
                    {t('result.view_estimate')}
                  </Button>
                )}
                {step === 4 && !isMonthlySupport && (
                  <Button
                    variant="gradient"
                    onClick={handleCalculate}
                    disabled={!deadline}
                  >
                    {t('result.view_estimate')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
