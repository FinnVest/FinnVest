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

    // Email template
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>¡Bienvenido a FinnVest! 🚀</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #667eea; margin-bottom: 10px;">¡Bienvenido a FinnVest! 🚀</h1>
              <p style="font-size: 18px; color: #666;">Tu viaje hacia la libertad financiera comienza aquí</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h2 style="margin-top: 0;">¡Gracias por unirte a nuestra comunidad!</h2>
              <p>Estamos emocionados de tenerte como parte de nuestro equipo. Tu lugar en la lista de espera está confirmado y serás de los primeros en acceder cuando lancemos la plataforma.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
              <h3 style="color: #667eea; margin-top: 0;">¿Qué puedes esperar?</h3>
              <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 10px;">📈 <strong>Inversiones sin riesgo:</strong> Aprende con dinero virtual</li>
                  <li style="margin-bottom: 10px;">⏰ <strong>Lecciones de 5 minutos:</strong> Aprende a tu ritmo</li>
                  <li style="margin-bottom: 10px;">💰 <strong>Estrategias de ahorro:</strong> Organiza tus finanzas</li>
                  <li style="margin-bottom: 10px;">🎯 <strong>Gamificación:</strong> Diviértete mientras aprendes</li>
              </ul>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
              <p style="font-size: 16px; color: #666;">Te mantendremos informado sobre:</p>
              <p style="font-size: 14px; color: #888;">• Fecha de lanzamiento oficial<br>
              • Acceso anticipado exclusivo<br>
              • Contenido educativo premium<br>
              • Ofertas especiales para miembros</p>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <p style="margin: 0; font-size: 14px; color: #555;">
                  <strong>💡 Consejo del día:</strong> Comienza ahorrando el 10% de tus ingresos. Pequeños cambios hoy, grandes resultados mañana.
              </p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #888;">
                  ¿Tienes preguntas? Responde a este email o contáctanos en <a href="mailto:soporte@finnvest.com" style="color: #667eea;">soporte@finnvest.com</a>
              </p>
              <p style="font-size: 12px; color: #999;">
                  © 2024 FinnVest. Todos los derechos reservados.
              </p>
          </div>
      </body>
      </html>
    `

    // Send email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FinnVest <noreply@finnvest.com>',
        to: email,
        subject: '¡Bienvenido a FinnVest! 🚀 Tu lugar está reservado',
        html: emailContent,
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text()
      throw new Error(`Failed to send email: ${error}`)
    }

    const result = await resendResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully',
        data: result 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
}) 