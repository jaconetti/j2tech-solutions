import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { db } from '@/lib/db'

export const metadata = {
  title: 'Blog',
  description: 'Insights sobre tecnologia e desenvolvimento de software'
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
}

async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const posts = await db.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return posts.map(post => ({
    slug: post.slug,
    title: locale === 'en' && post.titleEn ? post.titleEn : post.title,
    description: locale === 'en' && post.descriptionEn ? post.descriptionEn : post.description,
    category: post.category,
    coverImage: post.coverImage || undefined,
    tags: JSON.parse(post.tags),
    readTime: post.readTime,
    featured: post.featured,
    createdAt: post.createdAt
  }))
}

export default async function BlogPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const posts = await getBlogPosts(params.locale)

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--surface))] py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl">Blog</h1>
            <p className="text-lg text-[rgb(var(--muted))] lg:text-xl">
              Insights sobre tecnologia, desenvolvimento de software e inovação
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          {posts?.length === 0 ? (
            <div className="text-center text-[rgb(var(--muted))]">
              <p>Nenhum post publicado ainda. Em breve!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts?.map?.((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full transition-all hover:scale-105">
                    {post.coverImage && (
                      <div className="relative aspect-video bg-[rgb(var(--card))]">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.createdAt).toLocaleDateString(params.locale === 'pt' ? 'pt-BR' : 'en-US')}
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        {post.readTime} min {params.locale === 'pt' ? 'de leitura' : 'read'}
                      </div>
                      <div className="mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}