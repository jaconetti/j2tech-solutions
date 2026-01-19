'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react'
import { Link } from '@/lib/navigation'

export default function Footer() {
  const t = useTranslations('common')
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') }
  ]

  const services = [
    { href: '/services#mvp', label: 'MVP Development' },
    { href: '/services#apps', label: 'Apps Mobile' },
    { href: '/services#saas', label: 'SaaS' },
    { href: '/services#ecommerce', label: 'E-commerce' },
    { href: '/services#corporate', label: t('footer.services_corporate') },
    { href: '/services#institutional', label: t('footer.services_institutional') },
    { href: '/services#monthlySupport', label: t('footer.services_support') }
  ]

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/j2-tech-solutions', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/jaconetti', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/j2tech', label: 'Twitter' }
  ]

  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/favicon.svg"
                  alt="J2 Tech Solutions"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold gradient-text">
                J2 Tech
              </span>
            </Link>
            <p className="mt-4 text-sm text-[rgb(var(--muted))]">
              {t('footer.tagline')}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks?.map?.((social) => (
                <a
                  key={social?.label}
                  href={social?.href ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[rgb(var(--card))] p-2 transition-colors hover:bg-[rgb(var(--primary))]/20"
                  aria-label={social?.label}
                >
                  {social?.icon && <social.icon className="h-5 w-5" />}
                </a>
              )) ?? null}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[rgb(var(--foreground))]">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3">
              {quickLinks?.map?.((link) => (
                <li key={link?.href}>
                  <Link
                    href={link?.href ?? '#'}
                    className="text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {link?.label}
                  </Link>
                </li>
              )) ?? null}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[rgb(var(--foreground))]">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {services?.map?.((service) => (
                <li key={service?.href}>
                  <Link
                    href={service?.href ?? '#'}
                    className="text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {service?.label}
                  </Link>
                </li>
              )) ?? null}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[rgb(var(--foreground))]">
              {t('footer.get_in_touch')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[rgb(var(--muted))]">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:contato@j2tech.com"
                  className="hover:text-[rgb(var(--primary))]"
                >
                  contato@j2tech.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[rgb(var(--muted))]">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>São Paulo, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[rgb(var(--border))] pt-8 text-center">
          <p className="text-sm text-[rgb(var(--muted))]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
