'use client'

import { MessageCircle } from 'lucide-react'
import { analytics } from '@/lib/analytics'

export default function WhatsAppButton() {
  const handleClick = () => {
    analytics.clickWhatsApp('floating_button')
    window?.open?.('https://wa.me/5511953890022?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20J2%20Tech', '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </button>
  )
}
