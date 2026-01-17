import { z } from 'zod'

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  
  company: z.string().optional(),
  
  projectType: z.enum([
    'mvp',
    'app_mobile',
    'saas',
    'ecommerce',
    'corporate',
    'other'
  ], {
    required_error: 'Selecione o tipo de projeto'
  }),
  
  budget: z.enum([
    'under_20k',
    '20k_50k',
    '50k_100k',
    'over_100k',
    'undefined'
  ]).optional(),
  
  message: z.string()
    .min(10, 'Mensagem muito curta')
    .max(1000, 'Mensagem muito longa'),
  
  consent: z.boolean()
    .refine(val => val === true, {
      message: 'Você deve aceitar receber comunicações'
    })
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  name: z.string().optional()
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Calculator Schema
export const calculatorSchema = z.object({
  projectType: z.enum(['mvp', 'app_mobile', 'saas', 'ecommerce', 'corporate']),
  complexity: z.enum(['simple', 'medium', 'complex']),
  features: z.array(z.string()),
  deadline: z.enum(['urgent', 'normal', 'flexible'])
})

export type CalculatorData = z.infer<typeof calculatorSchema>

// Calculator Lead Schema
export const calculatorLeadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').toLowerCase(),
  phone: z.string().optional(),
  projectType: z.string(),
  complexity: z.string(),
  features: z.array(z.string()),
  deadline: z.string(),
  estimateMin: z.number(),
  estimateMax: z.number(),
  timeline: z.string()
})

export type CalculatorLeadData = z.infer<typeof calculatorLeadSchema>
