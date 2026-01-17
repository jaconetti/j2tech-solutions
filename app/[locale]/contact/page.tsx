'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, ContactFormData } from '@/lib/schemas'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Clock } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result?.success) {
        setSubmitStatus('success')
        analytics.submitForm('contact', true)
        reset()
      } else {
        throw new Error(result?.message ?? 'Error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      analytics.submitForm('contact', false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl">{t('title')}</h1>
            <p className="text-lg text-[rgb(var(--muted))] lg:text-xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('form_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t('name_label')} {t('required')}</Label>
                    <Input id="name" {...register('name')} className="mt-2" placeholder={t('name_placeholder')} />
                    {errors?.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">{t('email_label')} {t('required')}</Label>
                    <Input id="email" type="email" {...register('email')} className="mt-2" placeholder={t('email_placeholder')} />
                    {errors?.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="company">{t('company_label')}</Label>
                    <Input id="company" {...register('company')} className="mt-2" placeholder={t('company_placeholder')} />
                  </div>

                  <div>
                    <Label htmlFor="projectType">{t('project_type_label')} {t('required')}</Label>
                    <select
                      id="projectType"
                      {...register('projectType')}
                      className="mt-2 flex h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-sm"
                    >
                      <option value="">{t('project_type_placeholder')}</option>
                      <option value="mvp">{t('project_type_mvp')}</option>
                      <option value="app_mobile">{t('project_type_app')}</option>
                      <option value="saas">{t('project_type_saas')}</option>
                      <option value="ecommerce">{t('project_type_ecommerce')}</option>
                      <option value="corporate">{t('project_type_corporate')}</option>
                      <option value="other">{t('project_type_other')}</option>
                    </select>
                    {errors?.projectType && <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message">{t('message_label')} {t('required')}</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className="mt-2"
                      rows={5}
                      placeholder={t('message_placeholder')}
                    />
                    {errors?.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>

                  <div className="flex items-start gap-2">
                    <input id="consent" type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 rounded" />
                    <Label htmlFor="consent" className="text-sm font-normal">
                      {t('consent_label')}
                    </Label>
                  </div>
                  {errors?.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

                  {submitStatus === 'success' && (
                    <div className="rounded-lg bg-green-500/10 p-4 text-sm text-green-500">
                      {t('success_message')}
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-500">
                      {t('error_message')}
                    </div>
                  )}

                  <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('submitting') : t('submit_button')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('info_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10">
                      <Mail className="h-5 w-5 text-[rgb(var(--primary))]" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{t('email_title')}</h3>
                      <a href="mailto:contato@j2tech.com" className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--primary))]">
                        contato@j2tech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--secondary))]/10">
                      <MapPin className="h-5 w-5 text-[rgb(var(--secondary))]" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{t('location_title')}</h3>
                      <p className="text-sm text-[rgb(var(--muted))]">{t('location_text')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent))]/10">
                      <Clock className="h-5 w-5 text-[rgb(var(--accent))]" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{t('hours_title')}</h3>
                      <p className="text-sm text-[rgb(var(--muted))]">{t('hours_text')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
