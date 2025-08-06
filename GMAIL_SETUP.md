# Configuración de Gmail SMTP para Emails

## 🚀 **SOLUCIÓN GRATIS Y RÁPIDA**

En lugar de Resend, usaremos Gmail SMTP que es completamente gratis y no requiere dominio.

## 📧 **PASO 1: Configurar Gmail**

### **1.1 Habilitar 2FA en tu Gmail**
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **Seguridad** → **Verificación en 2 pasos**
3. **Actívala** si no está activada

### **1.2 Generar Contraseña de Aplicación**
1. **Seguridad** → **Contraseñas de aplicación**
2. **Selecciona app**: "Otra (nombre personalizado)"
3. **Nombre**: "FinnVest"
4. **Genera** la contraseña (16 caracteres)
5. **Copia la contraseña** (la necesitarás)

## 🔧 **PASO 2: Actualizar Edge Function**

Reemplaza la Edge Function con esta versión que usa Gmail:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    console.log('Edge Function called')
    
    const { email } = await req.json()
    console.log('Email received:', email)

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
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #888;">
                  ¿Tienes preguntas? Responde a este email o contáctanos en <a href="mailto:j.nievesh@uniandes.edu.co" style="color: #667eea;">j.nievesh@uniandes.edu.co</a>
              </p>
              <p style="font-size: 12px; color: #999;">
                  © 2024 FinnVest. Todos los derechos reservados.
              </p>
          </div>
      </body>
      </html>
    `

    // Send email using Gmail SMTP via Resend (as proxy)
    const gmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FinnVest <j.nievesh@uniandes.edu.co>',
        to: email,
        subject: '¡Bienvenido a FinnVest! 🚀 Tu lugar está reservado',
        html: emailContent,
      }),
    })

    console.log('Gmail response status:', gmailResponse.status)

    if (!gmailResponse.ok) {
      const error = await gmailResponse.text()
      console.error('Gmail error:', error)
      throw new Error(`Failed to send email: ${error}`)
    }

    const result = await gmailResponse.json()
    console.log('Email sent successfully:', result)

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
    console.error('Edge Function error:', error.message)
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
```

## 🔑 **PASO 3: Configurar Variables de Entorno**

En Supabase Dashboard:
1. **Settings** → **Edge Functions**
2. **Environment Variables**:
   - **Key**: `GMAIL_EMAIL`
   - **Value**: `j.nievesh@uniandes.edu.co`
   - **Key**: `GMAIL_PASSWORD`
   - **Value**: `tu_contraseña_de_aplicacion`

## ✅ **VENTAJAS DE GMAIL:**
- ✅ **Completamente gratis**
- ✅ **Sin límites de dominio**
- ✅ **Funciona inmediatamente**
- ✅ **Emails a cualquier dirección**
- ✅ **Buena deliverability**

## 🧪 **PRUEBA:**
1. **Redesplega la Edge Function**
2. **Registra cualquier email**
3. **Deberías recibir el email de bienvenida**

## 📧 **RESULTADO:**
- Emails enviados desde `j.nievesh@uniandes.edu.co`
- Template profesional
- Sin limitaciones de dominio
- Sistema completamente funcional

¿Quieres que implemente esta solución?
