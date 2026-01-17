declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const analytics = {
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window?.gtag) {
      window.gtag('event', eventName, properties ?? {})
    }
  },
  
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && window?.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? '', {
        page_path: url
      })
    }
  },
  
  // Common events
  clickCTA: (location: string, type: string, text: string) => {
    analytics.track('CTA Clicked', {
      location,
      type,
      text
    })
  },
  
  submitForm: (formName: string, success: boolean) => {
    analytics.track('Form Submitted', {
      form_name: formName,
      success
    })
  },
  
  viewProject: (projectId: string, projectName: string) => {
    analytics.track('Project Viewed', {
      project_id: projectId,
      project_name: projectName
    })
  },
  
  calculateBudget: (estimate: { min: number; max: number }) => {
    analytics.track('Calculator Completed', {
      estimate_min: estimate.min,
      estimate_max: estimate.max
    })
  },
  
  clickWhatsApp: (source: string) => {
    analytics.track('WhatsApp Clicked', {
      source
    })
  }
}
