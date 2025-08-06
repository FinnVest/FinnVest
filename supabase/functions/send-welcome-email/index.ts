import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    // Template HTML del email de bienvenida
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>¡Bienvenido a FinnVest!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">¡Bienvenido a FinnVest! 🚀</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">Tu futuro financiero comienza aquí</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 20px;">
            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #667eea;">
              <h2 style="color: #1e40af; margin-top: 0; font-size: 24px;">¡Gracias por unirte a nuestra waitlist!</h2>
              <p style="margin-bottom: 0; font-size: 16px;">Hola,</p>
              <p style="margin-bottom: 0; font-size: 16px;">Nos emociona que te hayas unido a la comunidad de FinnVest. Estás en el camino correcto para transformar tu futuro financiero con educación práctica y herramientas innovadoras.</p>
            </div>
            
            <!-- What to expect -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e40af; font-size: 20px; margin-bottom: 20px;">¿Qué puedes esperar de FinnVest?</h3>
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background: #dbeafe; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">📚</div>
                  <div>
                    <strong style="color: #1e40af;">Educación financiera práctica</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280;">Aprende con lecciones de 5 minutos diseñadas para tu ritmo de vida</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background: #dbeafe; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">💡</div>
                  <div>
                    <strong style="color: #1e40af;">Inversiones sin riesgo</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280;">Simula inversiones con dinero virtual y aprende sin perder</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background: #dbeafe; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">🎯</div>
                  <div>
                    <strong style="color: #1e40af;">Estrategias de ahorro</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280;">Descubre formas efectivas de ahorrar sin que duela</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background: #dbeafe; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">📊</div>
                  <div>
                    <strong style="color: #1e40af;">Entiende los impuestos</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280;">Aprende sobre DIAN y optimiza tu situación fiscal</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background: #dbeafe; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">🏆</div>
                  <div>
                    <strong style="color: #1e40af;">Gamificación</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280;">Gana puntos, sube de nivel y mantén rachas activas</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Benefits -->
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
              <h4 style="color: #1e40af; margin-top: 0; font-size: 18px; text-align: center;">🎁 Beneficios exclusivos para early adopters</h4>
              <div style="display: grid; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #059669;">✓</span>
                  <span>Acceso anticipado a todas las funciones</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #059669;">✓</span>
                  <span>Descuentos especiales en el lanzamiento</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #059669;">✓</span>
                  <span>Contenido premium exclusivo</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #059669;">✓</span>
                  <span>Notificaciones prioritarias</span>
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="font-size: 20px; color: #1e40af; font-weight: 600; margin-bottom: 10px;">¡Te notificaremos cuando lancemos!</p>
              <p style="color: #6b7280; margin-bottom: 0;">Mientras tanto, síguenos en nuestras redes sociales para consejos financieros diarios.</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <div style="margin-bottom: 20px;">
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Instagram</a>
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Twitter</a>
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">Este email fue enviado a ${email}</p>
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">Si no solicitaste este registro, puedes ignorar este mensaje.</p>
            <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;">© 2024 FinnVest. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Enviar email usando Resend (recomendado)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FinnVest <noreply@finnvest.com>',
        to: email,
        subject: '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí',
        html: emailTemplate
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to send email: ${error}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully',
        emailId: result.id 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error sending welcome email:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 400
      }
    )
  }
}) 