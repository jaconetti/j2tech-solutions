'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/animated-section'

interface Project {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  image: string
  link?: string
  status: 'production' | 'beta'
}

const categories = [
  { key: 'all', label: 'filters.all' },
  { key: 'mvp', label: 'filters.mvp' },
  { key: 'saas', label: 'filters.saas' },
  { key: 'app_mobile', label: 'filters.apps' },
  { key: 'ecommerce', label: 'filters.ecommerce' }
]

const projects: Project[] = [
  {
    id: '1',
    title: 'Viaje Organizado',
    description: 'Planejador de viagens inteligente que ajuda viajantes a organizar roteiros completos, incluindo transporte, hospedagem, passeios e atividades, com recomendações personalizadas e integração com serviços de reserva.',
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Stripe'],
    image: '/viajeorganizado.png',
    link: 'https://viajeorganizado.com.br',
    status: 'production'
  },
  {
    id: '2',
    title: 'ZAZ Conversor',
    description: 'SaaS brasileiro que converte etiquetas ZPL e EPL para PDF/PNG online. O único serviço nacional que suporta ambos os formatos, atendendo vendedores do Mercado Livre, Shopee, Amazon FBA e distribuidoras com impressoras térmicas. Conta com planos free e pagos via Stripe, autenticação AWS e pré-renderização estática para SEO.',
    category: 'saas',
    tags: ['React', 'JavaScript', 'AWS Lambda', 'CloudFront', 'S3', 'Stripe', 'Styled Components', 'React Router'],
    image: '/screencapture-dmn4r7jdc3ye-cloudfront-net-2026-01-21-09_29_29.png',
    link: 'https://www.zaz-conversor.com.br/',
    status: 'production'
  },
  {
    id: '3',
    title: 'App E-commerce - Norte Natural',
    description: 'Aplicativo de e-commerce para a marca Norte Natural, oferecendo uma experiência de compra online intuitiva e integrada com sistemas de pagamento e gerenciamento de estoque.',
    category: 'ecommerce',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    image: 'https://0bqvv1lslktszmpz.public.blob.vercel-storage.com/media-j2tech/norte-natural-vercel-app.png',
    link: 'https://norte-natural.vercel.app/',
    status: 'beta'
  },
  {
    id: '4',
    title: 'App Minha Bíblia',
    description: 'Aplicativo de estudo bíblico com recursos de leitura, anotações e planos de estudo',
    category: 'app_mobile',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    image: 'https://0bqvv1lslktszmpz.public.blob.vercel-storage.com/media-j2tech/minhabiblia-app-br.png',
    link: 'https://www.minhabiblia.app.br/',
    status: 'production'
  },
  {
    id: '5',
    title: 'TrainX',
    description: 'Plataforma SaaS para personal trainers gerenciarem alunos, prescrever treinos, acompanhar avaliações físicas, agendar sessões, processar pagamentos e se conectar com novos clientes via marketplace.',
    category: 'app_mobile',
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Prisma', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Vercel', 'PWA', 'Cloudflare R2', 'Stripe', 'Asaas'],
    image: 'https://0bqvv1lslktszmpz.public.blob.vercel-storage.com/media-j2tech/screencapture-trainx-web-vercel-app-connect-2026-06-25-14_37_06.png',
    link: 'https://trainx-web.vercel.app/',
    status: 'beta'
  },
  {
    id: '6',
    title: 'AprovaTech Concursos',
    description: 'Plataforma SaaS de estudos para concursos públicos com planos de estudo personalizados, cronograma semanal, timer Pomodoro, simulados e acompanhamento de progresso',
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Firebase', 'Tailwind CSS', 'Vercel', 'Asaas', 'Brevo'],
    image: 'https://0bqvv1lslktszmpz.public.blob.vercel-storage.com/media-j2tech/screencapture-aprovatechconcursos-br-2026-06-26-16_38_57.png',
    link: 'https://aprovatechconcursos.com.br',
    status: 'beta'
  }
]

export default function PortfolioPage() {
  const t = useTranslations('portfolio')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold lg:text-5xl">{t('title')}</h1>
              <p className="text-lg text-[rgb(var(--muted))] lg:text-xl">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Filtros */}
          <AnimatedSection>
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.key)}
                  className="transition-all duration-300"
                >
                  {t(category.label)}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Card className="group overflow-hidden h-full">
                <div className="relative aspect-video bg-[rgb(var(--card))]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={project.id === '2' ? 'object-cover object-top' : 'object-cover'}
                  />
                  <div className="absolute right-2 top-2">
                    <Badge variant="default" className="bg-black/50 backdrop-blur-sm">
                      {project.status === 'production' ? t('status_production') : t('status_beta')}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description.startsWith('portfolio_') 
                      ? project.description === 'portfolio_project1_desc'
                        ? 'Planejador de viagens inteligente que ajuda viajantes a organizar roteiros completos'
                        : project.description === 'portfolio_project2_desc'
                        ? 'Ferramenta de conversão de etiquetas para e-commerce com automação completa'
                        : 'Micro SaaS para pequenas empresas criarem catálogos digitais profissionais'
                      : project.description
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {project.link ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('view_project')}
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('view_project')}
                    </Button>
                  )}
                </CardFooter>
              </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
