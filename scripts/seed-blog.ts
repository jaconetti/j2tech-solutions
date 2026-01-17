import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

const blogPostsPT = [
  {
    title: 'Como Validar sua Ideia de Startup com um MVP',
    slug: 'como-validar-ideia-startup-mvp-pt',
    description: 'Descubra o processo completo para validar sua ideia de negócio desenvolvendo um MVP eficiente e econômico.',
    content: `# Como Validar sua Ideia de Startup com um MVP

Você tem uma ideia brilhante para uma startup, mas não sabe por onde começar? O MVP (Minimum Viable Product) é a resposta.

## O que é um MVP?

MVP é a versão mais simples do seu produto que ainda assim entrega valor ao cliente. É uma estratégia para testar hipóteses de negócio com o mínimo de investimento.

## Por que desenvolver um MVP?

1. **Redução de Riscos**: Teste sua ideia antes de investir pesado
2. **Feedback Real**: Aprenda com usuários reais desde o início
3. **Economia**: Invista apenas no essencial
4. **Velocidade**: Chegue ao mercado em 4-6 semanas

## Como Criar um MVP Eficiente

### 1. Defina o Problema Core
Identifique o problema principal que você está resolvendo.

### 2. Liste as Features Essenciais
Escolha apenas 3-5 funcionalidades necessárias.

### 3. Desenvolva Rápido
Use tecnologias modernas como Next.js, React Native, e Node.js.

### 4. Lance e Aprenda
Coloque seu MVP na frente de usuários reais o mais rápido possível.

**Pronto para criar seu MVP?** Entre em contato e vamos conversar.`,
    category: 'MVP',
    tags: ['mvp', 'startup', 'validação', 'produto'],
    readTime: 8,
    published: true,
    featured: true,
    coverImage: '/images/blog/mvp-validation.jpg',
    titleEn: 'How to Validate Your Startup Idea with an MVP',
    descriptionEn: 'Discover the complete process to validate your business idea by developing an efficient and economical MVP.',
    contentEn: `# How to Validate Your Startup Idea with an MVP

Do you have a brilliant startup idea but don't know where to start? The MVP (Minimum Viable Product) is the answer.

## What is an MVP?

An MVP is the simplest version of your product that still delivers value to the customer.

## Why Develop an MVP?

1. **Risk Reduction**: Test your idea before investing heavily
2. **Real Feedback**: Learn from real users from day one
3. **Economy**: Invest only in essentials
4. **Speed**: Reach the market in 4-6 weeks

## How to Create an Efficient MVP

### 1. Define the Core Problem
Identify the main problem you're solving.

### 2. List Essential Features
Choose only 3-5 necessary features.

### 3. Develop Fast
Use modern technologies like Next.js, React Native, and Node.js.

### 4. Launch and Learn
Put your MVP in front of real users as quickly as possible.

**Ready to create your MVP?** Get in touch and let's talk.`,
  },
  {
    title: 'Next.js vs React: Qual Escolher para seu Projeto?',
    slug: 'nextjs-vs-react-qual-escolher-pt',
    description: 'Entenda as diferenças entre Next.js e React e descubra qual framework é ideal para seu próximo projeto web.',
    content: `# Next.js vs React: Qual Escolher para seu Projeto?

Uma das dúvidas mais comuns no desenvolvimento web moderno.

## React: A Biblioteca UI

React é uma biblioteca JavaScript para construir interfaces de usuário.

### Vantagens do React

- **Flexibilidade Total**
- **Comunidade Gigante**
- **Curva de Aprendizado Simples**
- **Perfeito para SPAs**

## Next.js: O Framework React

Next.js adiciona funcionalidades essenciais ao React.

### Vantagens do Next.js

- **SSR e SSG Built-in**
- **File-based Routing**
- **API Routes**
- **Image Optimization**
- **SEO Superior**

## Nossa Recomendação

Para 90% dos projetos, recomendamos Next.js pelas vantagens em performance e SEO.`,
    category: 'Tecnologia',
    tags: ['nextjs', 'react', 'frontend', 'framework'],
    readTime: 6,
    published: true,
    featured: true,
    coverImage: '/images/blog/nextjs-vs-react.jpg',
    titleEn: 'Next.js vs React: Which to Choose for Your Project?',
    descriptionEn: 'Understand the differences between Next.js and React and discover which framework is ideal for your next web project.',
    contentEn: `# Next.js vs React: Which to Choose for Your Project?

One of the most common questions in modern web development.

## React: The UI Library

React is a JavaScript library for building user interfaces.

### React Advantages

- **Total Flexibility**
- **Giant Community**
- **Simple Learning Curve**
- **Perfect for SPAs**

## Next.js: The React Framework

Next.js adds essential features to React.

### Next.js Advantages

- **Built-in SSR and SSG**
- **File-based Routing**
- **API Routes**
- **Image Optimization**
- **Superior SEO**

## Our Recommendation

For 90% of projects, we recommend Next.js for performance and SEO advantages.`,
  },
  {
    title: '5 Tendências de Desenvolvimento Mobile para 2026',
    slug: '5-tendencias-mobile-2026-pt',
    description: 'Descubra as principais tendências que vão dominar o desenvolvimento de aplicativos mobile em 2026.',
    content: `# 5 Tendências de Desenvolvimento Mobile para 2026

O mercado mobile continua evoluindo rapidamente.

## 1. React Native com Expo

React Native se consolidou como escolha #1 para desenvolvimento cross-platform.

## 2. AI Integrada nos Apps

IA deixou de ser luxo e virou necessidade.

## 3. Super Apps

Aplicativos que fazem tudo em um só lugar.

## 4. 5G e Edge Computing

Com 5G, apps ganham novas possibilidades.

## 5. App Clips e Instant Apps

Experiências sem instalação.

**Quer um app mobile moderno?** Solicite um orçamento.`,
    category: 'Mobile',
    tags: ['mobile', 'tendências', 'react-native', '2026'],
    readTime: 5,
    published: true,
    featured: false,
    coverImage: '/images/blog/mobile-trends-2026.jpg',
    titleEn: '5 Mobile Development Trends for 2026',
    descriptionEn: 'Discover the main trends that will dominate mobile app development in 2026.',
    contentEn: `# 5 Mobile Development Trends for 2026

The mobile market continues to evolve rapidly.

## 1. React Native with Expo

React Native consolidated as #1 choice for cross-platform development.

## 2. AI Integrated in Apps

AI is no longer a luxury but a necessity.

## 3. Super Apps

Apps that do everything in one place.

## 4. 5G and Edge Computing

With 5G, apps gain new possibilities.

## 5. App Clips and Instant Apps

Experiences without installation.

**Want a modern mobile app?** Request a quote.`,
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected')

    // Clean existing posts  
    console.log('🗑️  Cleaning existing blog posts...')
    const deleted = await prisma.post.deleteMany({})
    console.log(`🗑️  Deleted ${deleted.count} posts`)

    // Create blog posts
    console.log('📝 Creating blog posts...')
    for (const post of blogPostsPT) {
      const created = await prisma.post.create({
        data: {
          slug: post.slug,
          title: post.title,
          titleEn: post.titleEn,
          description: post.description,
          descriptionEn: post.descriptionEn,
          content: post.content,
          contentEn: post.contentEn,
          category: post.category,
          tags: JSON.stringify(post.tags) as any,
          readTime: post.readTime,
          featured: post.featured,
          published: post.published
        },
      })
      console.log(`✅ Created: ${post.title}`)
    }

    console.log('✨ Seed completed successfully!')
    console.log(`📊 Total posts created: ${blogPostsPT.length}`)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
