import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import { db } from '@/lib/db'
import { MDXRemote } from 'next-mdx-remote/rsc'

const MDXComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-4 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-3 mt-6" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mb-2 mt-4" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-[rgb(var(--primary))] pl-4 italic my-4 text-[rgb(var(--muted))]" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-[rgb(var(--surface))] px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-[rgb(var(--surface))] p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  a: (props: any) => (
    <a className="text-[rgb(var(--primary))] hover:underline" {...props} />
  ),
  img: (props: any) => (
    <img className="rounded-lg my-4" {...props} />
  ),
}

interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  coverImage?: string
  tags: string[]
  readTime: number
  featured: boolean
  createdAt: Date
  content: string
}

async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  const post = await db.post.findUnique({
    where: {
      slug: slug
    }
  })
  
  if (!post || !post.published) {
    return null
  }
  
  return {
    slug: post.slug,
    title: locale === 'en' && post.titleEn ? post.titleEn : post.title,
    description: locale === 'en' && post.descriptionEn ? post.descriptionEn : post.description,
    category: post.category,
    coverImage: post.coverImage || undefined,
    tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags,
    readTime: post.readTime,
    featured: post.featured,
    createdAt: post.createdAt,
    content: locale === 'en' && post.contentEn ? post.contentEn : post.content
  }
}

async function getAllPosts() {
  const posts = await db.post.findMany({
    where: {
      published: true
    },
    select: {
      slug: true
    }
  })
  
  return posts.flatMap(post => [
    { slug: post.slug, locale: 'pt' },
    { slug: post.slug, locale: 'en' }
  ])
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug, params.locale)
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }
  
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const post = await getPost(params.slug, params.locale)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen">
      {/* Header com imagem de capa */}
      <section className="relative bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <Link 
            href="/blog" 
            className="mb-8 inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {params.locale === 'pt' ? 'Voltar ao Blog' : 'Back to Blog'}
          </Link>
          
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
            {post.title}
          </h1>
          
          <p className="mb-8 text-lg text-[rgb(var(--muted))] lg:text-xl">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-[rgb(var(--muted))]">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString(
                params.locale === 'pt' ? 'pt-BR' : 'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} min {params.locale === 'pt' ? 'de leitura' : 'read'}
            </div>
          </div>
        </div>
      </section>
      
      {/* Imagem de capa */}
      {post.coverImage && (
        <div className="relative h-[400px] w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Conteúdo do post */}
      <article className="py-12 lg:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[rgb(var(--foreground))] prose-p:text-[rgb(var(--foreground))] prose-li:text-[rgb(var(--foreground))] prose-strong:text-[rgb(var(--foreground))] prose-a:text-[rgb(var(--primary))]">
            <MDXRemote source={post.content} components={MDXComponents as any} />
          </div>
        </div>
      </article>
      
      {/* Footer do post */}
      <section className="border-t border-[rgb(var(--border))] py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              {params.locale === 'pt' ? 'Ver todos os posts' : 'View all posts'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
