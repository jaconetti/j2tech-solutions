import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://j2tech.solutions'
  
  const locales = ['pt', 'en']
  const pages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/process',
    '/blog',
    '/calculator',
    '/contact'
  ]

  const routes: MetadataRoute.Sitemap = []

  // Add all pages for each locale
  locales.forEach(locale => {
    pages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page === '/blog' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page === '/services' ? 0.9 : 0.8,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt${page}`,
            en: `${baseUrl}/en${page}`
          }
        }
      })
    })
  })

  // Add blog posts (you can fetch from database here)
  const blogSlugs = [
    'como-validar-ideia-startup',
    'mvp-vs-produto-completo',
    'quanto-custa-app-2026',
    'tech-stack-startups-2026',
    'saas-escalavel',
    'ecommerce-estrategias-2026',
    'design-system-startup',
    'pricing-saas',
    'mobile-trends-2026',
    'seo-tecnico-para-devs',
    'suporte-tecnico-startups'
  ]

  locales.forEach(locale => {
    blogSlugs.forEach(slug => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      })
    })
  })

  return routes
}
