'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // Remove locale atual do path se existir
    const pathWithoutLocale = pathname.replace(/^\/(pt|en)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-2 rounded-lg bg-[rgb(var(--card))] p-1">
      <button
        onClick={() => switchLocale('pt')}
        className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          locale === 'pt'
            ? 'bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white'
            : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white'
            : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
        }`}
      >
        EN
      </button>
    </div>
  )
}
