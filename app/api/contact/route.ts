import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/schemas'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate data
    const validated = contactFormSchema.parse(data)

    // Save to database
    await db.contact.create({
      data: {
        name: validated?.name ?? '',
        email: validated?.email ?? '',
        company: validated?.company,
        projectType: validated?.projectType ?? '',
        budget: validated?.budget,
        message: validated?.message ?? '',
        status: 'new'
      }
    })

    // Send notification email
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0EA5E9; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
          Nova Mensagem de Contato - J2 Tech
        </h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nome:</strong> ${validated?.name ?? ''}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${validated?.email ?? ''}">${validated?.email ?? ''}</a></p>
          ${validated?.company ? `<p style="margin: 10px 0;"><strong>Empresa:</strong> ${validated.company}</p>` : ''}
          <p style="margin: 10px 0;"><strong>Tipo de Projeto:</strong> ${validated?.projectType ?? ''}</p>
          ${validated?.budget ? `<p style="margin: 10px 0;"><strong>Orçamento:</strong> ${validated.budget}</p>` : ''}
          <p style="margin: 10px 0;"><strong>Mensagem:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0EA5E9;">
            ${validated?.message ?? ''}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Recebido em: ${new Date().toLocaleString('pt-BR')}
        </p>
      </div>
    `

    const appUrl = process.env.NEXTAUTH_URL ?? ''
    const appName = appUrl ? new URL(appUrl).hostname.split('.')[0] : 'J2Tech'

    await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        subject: `Nova Mensagem de Contato - ${validated?.name ?? ''}`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'jeferson.jaconetti@gmail.com',
        sender_email: appUrl ? `noreply@${new URL(appUrl).hostname}` : 'noreply@j2tech.com',
        sender_alias: appName
      })
    })

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao enviar mensagem' },
      { status: 500 }
    )
  }
}
