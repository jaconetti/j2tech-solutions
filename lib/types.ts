// Portfolio Project Types
export interface PortfolioProject {
  id: string
  slug: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  category: 'mvp' | 'app' | 'saas' | 'ecommerce' | 'corporate'
  tags: string[]
  image: string
  images?: string[]
  link?: string
  github?: string
  featured: boolean
  challenge?: string
  challengeEn?: string
  solution?: string
  solutionEn?: string
  results?: string[]
  resultsEn?: string[]
  techStack: string[]
  timeline: string
  status: 'production' | 'beta' | 'development'
}

// Service Types
export interface Service {
  id: string
  slug: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  icon: string
  features: string[]
  featuresEn?: string[]
  tech: string
  techEn?: string
  timeline: string
  timelineEn?: string
  price: string
  priceEn?: string
  color: string
}

// Process Step Types
export interface ProcessStep {
  id: number
  title: string
  titleEn?: string
  duration: string
  durationEn?: string
  description: string
  descriptionEn?: string
  activities: string[]
  activitiesEn?: string[]
  deliverables: string[]
  deliverablesEn?: string[]
  icon: string
}

// Blog Post Types
export interface BlogPost {
  id: string
  slug: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  content: string
  contentEn?: string
  coverImage?: string
  category: string
  tags: string[]
  readTime: number
  published: boolean
  featured: boolean
  views: number
  createdAt: Date
  updatedAt: Date
}

// Calculator Types
export interface CalculatorData {
  projectType: 'mvp' | 'app_mobile' | 'saas' | 'ecommerce' | 'corporate' | 'institutional' | 'monthly_support'
  complexity: 'simple' | 'medium' | 'complex'
  features: string[]
  deadline: 'urgent' | 'normal' | 'flexible'
  supportHours?: '10' | '20' | '40' | 'custom'
}

export interface CalculatorEstimate {
  min: number
  max: number
  timeline: string
  breakdown: {
    base: number
    complexity: number
    features: number
    deadline: number
  }
}

// Analytics Event Types
export interface AnalyticsEvent {
  eventName: string
  properties?: Record<string, any>
}
