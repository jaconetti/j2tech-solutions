import { NextResponse } from 'next/server'
import { calculatorLeadSchema } from '@/lib/schemas'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate data
    const validated = calculatorLeadSchema.parse(data)

    // Save to database
    await db.calculatorLead.create({
      data: {
        name: validated?.name ?? '',
        email: validated?.email ?? '',
        phone: validated?.phone,
        projectType: validated?.projectType ?? '',
        complexity: validated?.complexity ?? '',
        features: JSON.stringify(validated?.features ?? []),
        deadline: validated?.deadline ?? '',
        estimateMin: validated?.estimateMin ?? 0,
        estimateMax: validated?.estimateMax ?? 0,
        timeline: validated?.timeline ?? '',
        status: 'new'
      }
    })

    // Send notification email
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0EA5E9; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
          Nova Solicitação de Proposta - J2 Tech
        </h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nome:</strong> ${validated?.name ?? ''}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${validated?.email ?? ''}">${validated?.email ?? ''}</a></p>
          ${validated?.phone ? `<p style="margin: 10px 0;"><strong>WhatsApp:</strong> ${validated.phone}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
          <h3 style="color: #333; margin: 15px 0 10px;">Estimativa Calculada</h3>
          <p style="margin: 10px 0;"><strong>Tipo de Projeto:</strong> ${validated?.projectType ?? ''}</p>
          <p style="margin: 10px 0;"><strong>Complexidade:</strong> ${validated?.complexity ?? ''}</p>
          <p style="margin: 10px 0;"><strong>Funcionalidades:</strong> ${(validated?.features ?? []).join(', ')}</p>
          <p style="margin: 10px 0;"><strong>Prazo:</strong> ${validated?.deadline ?? ''}</p>
          <div style="background: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%); padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">Estimativa de Preço</p>
            <p style="color: white; margin: 10px 0 0; font-size: 28px; font-weight: bold;">
              R$ ${(validated?.estimateMin ?? 0).toLocaleString('pt-BR')} - R$ ${(validated?.estimateMax ?? 0).toLocaleString('pt-BR')}
            </p>
            <p style="color: white; margin: 10px 0 0; font-size: 14px;">Prazo: ${validated?.timeline ?? ''} semanas</p>
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
        subject: `Nova Solicitação de Proposta - ${validated?.name ?? ''}`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'jeferson.jaconetti@gmail.com',
        sender_email: appUrl ? `noreply@${new URL(appUrl).hostname}` : 'noreply@j2tech.com',
        sender_alias: appName
      })
    })

    return NextResponse.json({ success: true, message: 'Proposta solicitada com sucesso!' })
  } catch (error) {
    console.error('Calculator lead error:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao solicitar proposta' },
      { status: 500 }
    )
  }
}
