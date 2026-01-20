'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/language-switcher'
import { analytics } from '@/lib/analytics'
import { Link, usePathname, useRouter } from '@/lib/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('common')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 10)
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/process', label: t('nav.process') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') }
  ]

  const handleCTAClick = () => {
    analytics.clickCTA('header', 'primary', t('cta.start_project'))
    router.push(`/${locale}/contact`)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <div className="relative h-8 w-8 lg:h-10 lg:w-10">
              <Image
                src="/logo.png"
                alt="J2 Tech Solutions"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden text-lg font-bold gradient-text lg:block">
              Tech Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '#'}
                className={`text-sm font-medium transition-colors hover:text-[rgb(var(--primary))] ${
                  pathname.endsWith(item?.href) || (item?.href === '/' && pathname === `/${locale}`)
                    ? 'text-[rgb(var(--primary))]'
                    : 'text-[rgb(var(--foreground))]/80'
                }`}
              >
                {item?.label}
              </Link>
            )) ?? null}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <LanguageSwitcher />
            
            {/* CTA Button */}
            <Button
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] hover:opacity-90"
            >
              {t('cta.start_project')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="glass lg:hidden">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors hover:text-[rgb(var(--primary))] ${
                  pathname.endsWith(item?.href) || (item?.href === '/' && pathname === `/${locale}`)
                    ? 'text-[rgb(var(--primary))]'
                    : 'text-[rgb(var(--foreground))]/80'
                }`}
              >
                {item?.label}
              </Link>
            )) ?? null}
            
            <div className="flex flex-col gap-4 pt-4">
              <LanguageSwitcher />
              <Button
                onClick={() => {
                  handleCTAClick()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]"
              >
                {t('cta.start_project')}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
