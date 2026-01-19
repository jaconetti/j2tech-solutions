import { Organization, WithContext } from 'schema-dts'

export function getOrganizationSchema(locale: string): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'J2 Tech Solutions',
    url: `https://j2tech.solutions/${locale}`,
    logo: 'https://j2tech.solutions/logo_completo_j2_tech_solutions.png',
    description: locale === 'pt'
      ? 'Desenvolvemos MVPs, Apps Mobile e SaaS para startups que querem escalar rápido'
      : 'We develop MVPs, Mobile Apps and SaaS for startups that want to scale fast',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English'],
      telephone: '+55-11-99999-9999'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'São Paulo'
    },
    sameAs: [
      'https://www.linkedin.com/company/j2-tech-solutions',
      'https://github.com/j2-tech-solutions',
      'https://twitter.com/j2techsolutions'
    ],
    areaServed: {
      '@type': 'Country',
      name: ['Brazil', 'United States', 'Global']
    },
    knowsAbout: [
      'Software Development',
      'MVP Development',
      'Mobile App Development',
      'SaaS Development',
      'Web Development',
      'Startup Technology'
    ]
  }
}

export function getBlogPostSchema(
  locale: string,
  post: {
    title: string
    description: string
    slug: string
    createdAt: Date
    updatedAt: Date
    readTime: number
    category: string
  }
): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://j2tech.solutions/${locale}/blog/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'J2 Tech Solutions',
      url: `https://j2tech.solutions/${locale}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'J2 Tech Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://j2tech.solutions/logo_completo_j2_tech_solutions.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://j2tech.solutions/${locale}/blog/${post.slug}`
    },
    articleSection: post.category,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en-US',
    timeRequired: `PT${post.readTime}M`
  }
}

export function getServiceSchema(locale: string, service: {
  name: string
  description: string
  price: string
  url: string
}): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'J2 Tech Solutions',
      url: `https://j2tech.solutions/${locale}`
    },
    areaServed: {
      '@type': 'Country',
      name: ['Brazil', 'United States', 'Global']
    },
    url: service.url,
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: locale === 'pt' ? 'BRL' : 'USD'
    }
  }
}

export function getBreadcrumbSchema(locale: string, items: Array<{ name: string; url: string }>): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://j2tech.solutions${item.url}`
    }))
  }
}
