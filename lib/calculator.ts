import { CalculatorData, CalculatorEstimate } from './types'

const BASE_PRICES: Record<string, number> = {
  mvp: 8000,
  app_mobile: 12000,
  saas: 15000,
  ecommerce: 10000,
  corporate: 18000,
  institutional: 4000,
  monthly_support: 1500
}

const COMPLEXITY_MULTIPLIER: Record<string, number> = {
  simple: 0.7,
  medium: 1.0,
  complex: 1.4
}

const FEATURE_COSTS: Record<string, number> = {
  auth: 800,
  admin: 1200,
  payments: 2000,
  notifications: 1000,
  chat: 2500,
  api: 1500,
  upload: 800,
  analytics: 1500
}

const DEADLINE_MULTIPLIER: Record<string, number> = {
  urgent: 1.2,
  normal: 1.0,
  flexible: 0.9
}

const BASE_TIMELINE: Record<string, number> = {
  mvp: 5,
  app_mobile: 8,
  saas: 12,
  ecommerce: 8,
  corporate: 12,
  institutional: 3,
  monthly_support: 1
}

export function calculateEstimate(data: CalculatorData): CalculatorEstimate {
  // Special handling for monthly support
  if (data.projectType === 'monthly_support') {
    const supportPrices: Record<string, number> = {
      '10': 1500,
      '20': 2800,
      '40': 5200,
      'custom': 3500
    }
    
    const price = supportPrices[data.supportHours || '10'] || 1500
    
    return {
      min: price,
      max: price,
      timeline: 'mensal',
      breakdown: {
        base: price,
        complexity: 0,
        features: 0,
        deadline: 0
      }
    }
  }

  const basePrice = BASE_PRICES[data.projectType] ?? 25000
  const complexityFactor = COMPLEXITY_MULTIPLIER[data.complexity] ?? 1.0
  
  const featuresCost = (data?.features ?? []).reduce((sum: number, feature: string) => {
    return sum + (FEATURE_COSTS[feature] ?? 0)
  }, 0)
  
  const deadlineFactor = DEADLINE_MULTIPLIER[data.deadline] ?? 1.0
  
  const baseTotal = basePrice * complexityFactor
  const subtotal = baseTotal + featuresCost
  const total = subtotal * deadlineFactor
  
  // Add margin of +/- 20%
  const min = Math.round(total * 0.8)
  const max = Math.round(total * 1.2)
  
  // Calculate timeline
  const baseWeeks = BASE_TIMELINE[data.projectType] ?? 6
  const complexityWeeks = data.complexity === 'complex' ? 4 : data.complexity === 'simple' ? -2 : 0
  const featuresWeeks = Math.floor((data?.features?.length ?? 0) / 2)
  const totalWeeks = baseWeeks + complexityWeeks + featuresWeeks
  
  const timeline = data.deadline === 'urgent' 
    ? `${Math.max(3, Math.floor(totalWeeks * 0.7))}-${Math.floor(totalWeeks * 0.8)}`
    : data.deadline === 'flexible'
    ? `${totalWeeks}-${totalWeeks + 4}`
    : `${totalWeeks}-${totalWeeks + 2}`
  
  return {
    min,
    max,
    timeline,
    breakdown: {
      base: basePrice,
      complexity: Math.round(basePrice * (complexityFactor - 1)),
      features: featuresCost,
      deadline: Math.round(subtotal * (deadlineFactor - 1))
    }
  }
}

export function formatCurrency(value: number, locale: string = 'pt-BR'): string {
  if (locale === 'en') {
    // Para mercado internacional: preços mais altos mas competitivos
    // Aproximadamente 2.2x o preço brasileiro (vs 5x que seria paridade real)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value * 0.22)
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
