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
  const t = useTranslations('calculator')
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [complexity, setComplexity] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [estimate, setEstimate] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      deadline: deadline as any
    })
    setEstimate(result)
    analytics.calculateBudget({ min: result?.min ?? 0, max: result?.max ?? 0 })
    setStep(5)
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
            <h1 className="mb-4 text-4xl font-bold">Calculadora de Orçamento</h1>
            <p className="text-lg text-[rgb(var(--muted))]">
              Faça uma estimativa do custo do seu projeto em poucos passos
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map(i => (
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
                {step === 1 && 'Tipo de Projeto'}
                {step === 2 && 'Complexidade'}
                {step === 3 && 'Funcionalidades'}
                {step === 4 && 'Prazo'}
                {step === 5 && 'Sua Estimativa'}
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

              {step === 2 && (
                <div className="space-y-4">
                  {[
                    { key: 'simple', label: 'Simples', desc: '1-3 telas/funcionalidades básicas' },
                    { key: 'medium', label: 'Média', desc: '4-10 telas/funcionalidades' },
                    { key: 'complex', label: 'Complexa', desc: '10+ telas/funcionalidades avançadas' }
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
                      <div className="mb-1 font-semibold">{comp.label}</div>
                      <div className="text-sm text-[rgb(var(--muted))]">{comp.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { key: 'auth', label: 'Autenticação de usuários' },
                    { key: 'admin', label: 'Painel administrativo' },
                    { key: 'payments', label: 'Pagamentos online' },
                    { key: 'notifications', label: 'Notificações push' },
                    { key: 'chat', label: 'Chat em tempo real' },
                    { key: 'api', label: 'Integração com APIs externas' },
                    { key: 'upload', label: 'Upload de arquivos' },
                    { key: 'analytics', label: 'Relatórios/Analytics' }
                  ].map(feature => (
                    <button
                      key={feature.key}
                      onClick={() => toggleFeature(feature.key)}
                      className={`rounded-lg border-2 p-3 text-left text-sm transition-all ${
                        features.includes(feature.key)
                          ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                      }`}
                    >
                      {feature.label}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {[
                    { key: 'urgent', label: 'Urgente (< 30 dias)', desc: '+30% no valor' },
                    { key: 'normal', label: 'Normal (30-60 dias)', desc: 'Prazo padrão' },
                    { key: 'flexible', label: 'Flexível (60+ dias)', desc: '-15% desconto' }
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
                      <div className="mb-1 font-semibold">{dead.label}</div>
                      <div className="text-sm text-[rgb(var(--muted))]">{dead.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && estimate && (
                <div className="space-y-6">
                  <div className="rounded-xl bg-gradient-to-r from-[rgb(var(--primary))]/20 to-[rgb(var(--secondary))]/20 p-8 text-center">
                    <div className="mb-2 text-sm font-semibold text-[rgb(var(--muted))]">
                      Faixa de Preço
                    </div>
                    <div className="text-4xl font-bold gradient-text">
                      {formatCurrency(estimate.min)} - {formatCurrency(estimate.max)}
                    </div>
                    <div className="mt-4 text-sm text-[rgb(var(--muted))]">
                      Prazo: {estimate.timeline} semanas
                    </div>
                  </div>

                  <div className="text-sm text-[rgb(var(--muted))]">
                    <p className="mb-2 font-semibold">Baseado em:</p>
                    <ul className="space-y-1">
                      <li>• Projeto: {projectType}</li>
                      <li>• Complexidade: {complexity}</li>
                      <li>• {features.length} funcionalidades adicionais</li>
                      <li>• Prazo: {deadline}</li>
                    </ul>
                  </div>

                  <Card className="bg-[rgb(var(--surface))]">
                    <CardHeader>
                      <CardTitle className="text-xl">Quer uma proposta detalhada?</CardTitle>
                      <p className="text-sm text-[rgb(var(--muted))]">Preencha seus dados e entraremos em contato</p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" {...register('name')} className="mt-2" />
                          {errors?.name && <p className="mt-1 text-sm text-red-500">{String(errors?.name?.message ?? '')}</p>}
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" {...register('email')} className="mt-2" />
                          {errors?.email && <p className="mt-1 text-sm text-red-500">{String(errors?.email?.message ?? '')}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">WhatsApp</Label>
                          <Input id="phone" {...register('phone')} className="mt-2" />
                        </div>
                        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? 'Enviando...' : 'Solicitar Proposta'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && step < 5 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                )}
                {step === 5 && (
                  <Button variant="outline" onClick={() => { setStep(1); setEstimate(null) }}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Recalcular
                  </Button>
                )}
                <div className="ml-auto" />
                {step < 4 && (
                  <Button
                    variant="gradient"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !projectType) ||
                      (step === 2 && !complexity) ||
                      (step === 3 && features.length === 0)
                    }
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {step === 4 && (
                  <Button
                    variant="gradient"
                    onClick={handleCalculate}
                    disabled={!deadline}
                  >
                    Ver Estimativa
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
