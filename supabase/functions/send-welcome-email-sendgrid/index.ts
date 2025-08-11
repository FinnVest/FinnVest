/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

interface EmailRequest {
  email: string;
}

interface SendGridResponse {
  success: boolean;
  message?: string;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200 
    })
  }

  try {
    console.log('Edge Function called')
    
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Method not allowed. Use POST.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 405 
        }
      )
    }

    // Parse and validate request body
    let requestBody: EmailRequest;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON in request body' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    const { email } = requestBody;
    console.log('Email received:', email)

    // Validate email
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Valid email is required' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Check if SENDGRID_API_KEY is configured
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
    if (!sendgridApiKey) {
      console.error('SENDGRID_API_KEY not configured')
      return new Response(
        JSON.stringify({
          success: false, 
          error: 'Email service not configured. Please set SENDGRID_API_KEY.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Get sender email from environment or use default
    const senderEmail = Deno.env.get('SENDER_EMAIL') || 'noreply@finnvest.com';
    const senderName = Deno.env.get('SENDER_NAME') || 'FinnVest';

    // Validate sender email
    if (!emailRegex.test(senderEmail)) {
      console.error('Invalid sender email format:', senderEmail);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid sender email configuration' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Simple email template for testing
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
                  ¿Tienes preguntas? Responde a este email o contáctanos en <a href="mailto:finnvest.edu@gmail.com" style="color: #667eea;">finnvest.edu@gmail.com</a>
              </p>
              <p style="font-size: 12px; color: #999;">
                  © 2024 FinnVest. Todos los derechos reservados.
              </p>
          </div>
      </body>
      </html>
    `

    console.log('Sending email to SendGrid...')

    // Send email using SendGrid
    console.log(`Sending email to: ${email}`);
    
    const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            subject: '¡Bienvenido a FinnVest! 🚀 Tu lugar está reservado'
          }
        ],
        from: {
          email: senderEmail,
          name: senderName
        },
        content: [
          {
            type: 'text/html',
            value: emailContent
          }
        ]
      }),
    })

    console.log('SendGrid response status:', sendgridResponse.status)

    if (!sendgridResponse.ok) {
      let errorMessage = 'Failed to send email';
      try {
        const errorText = await sendgridResponse.text();
        console.error('SendGrid error response:', errorText);
        errorMessage = `SendGrid error: ${errorText}`;
      } catch (error) {
        console.error('Failed to read error response:', error);
        errorMessage = `SendGrid error: HTTP ${sendgridResponse.status}`;
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorMessage 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    console.log('Email sent successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Edge Function error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
