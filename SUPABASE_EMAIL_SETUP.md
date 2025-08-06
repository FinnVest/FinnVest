# Configuración de Emails Automáticos - Supabase

## 📧 Configurar Envío de Emails

### 1. Configurar SMTP en Supabase

1. **Ve a tu proyecto de Supabase**
2. **Settings > Auth > SMTP Settings**
3. **Habilita SMTP** y configura:

#### Opción A: Gmail (Recomendado para pruebas)
```
Host: smtp.gmail.com
Port: 587
User: tu-email@gmail.com
Pass: tu-contraseña-de-aplicación
Sender Name: FinnVest
```

#### Opción B: Resend (Recomendado para producción)
```
Host: smtp.resend.com
Port: 587
User: resend
Pass: re_xxxxxxxxxxxx
Sender Name: FinnVest
```

### 2. Crear Función de Email en Supabase

En el **SQL Editor** de Supabase, ejecuta:

```sql
-- Función para enviar email de bienvenida
CREATE OR REPLACE FUNCTION send_welcome_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Enviar email de bienvenida
  PERFORM
    net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Authorization', 'Bearer re_xxxxxxxxxxxx',
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'from', 'FinnVest <noreply@finnvest.com>',
        'to', NEW.email,
        'subject', '¡Bienvenido a FinnVest! 🚀',
        'html', format(
          '<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>¡Bienvenido a FinnVest!</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2563eb;">¡Bienvenido a FinnVest! 🚀</h1>
              </div>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1e40af; margin-top: 0;">¡Gracias por unirte a nuestra waitlist!</h2>
                <p>Hola,</p>
                <p>Nos emociona que te hayas unido a la comunidad de FinnVest. Estás en el camino correcto para transformar tu futuro financiero.</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #1e40af;">¿Qué puedes esperar?</h3>
                <ul>
                  <li>📚 <strong>Educación financiera práctica</strong> - Aprende con lecciones de 5 minutos</li>
                  <li>💡 <strong>Inversiones sin riesgo</strong> - Simula con dinero virtual</li>
                  <li>🎯 <strong>Estrategias de ahorro</strong> - Descubre formas efectivas de ahorrar</li>
                  <li>📊 <strong>Entiende los impuestos</strong> - Aprende sobre DIAN y más</li>
                  <li>🏆 <strong>Gamificación</strong> - Gana puntos mientras aprendes</li>
                </ul>
              </div>
              
              <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #1e40af; margin-top: 0;">🎁 Beneficios exclusivos para early adopters:</h4>
                <ul style="margin-bottom: 0;">
                  <li>Acceso anticipado a todas las funciones</li>
                  <li>Descuentos especiales en el lanzamiento</li>
                  <li>Contenido premium exclusivo</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 18px; color: #1e40af;"><strong>¡Te notificaremos cuando lancemos!</strong></p>
                <p>Mientras tanto, síguenos en nuestras redes sociales para consejos financieros diarios.</p>
              </div>
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                <p>Este email fue enviado a %s</p>
                <p>Si no solicitaste este registro, puedes ignorar este mensaje.</p>
                <p>© 2024 FinnVest. Todos los derechos reservados.</p>
              </div>
            </div>
          </body>
          </html>',
          NEW.email
        )
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para enviar email automáticamente
CREATE TRIGGER send_welcome_email_trigger
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION send_welcome_email();
```

### 3. Configuración Alternativa con Edge Functions

Si prefieres usar Edge Functions de Supabase:

1. **Crea una Edge Function:**
   ```bash
   supabase functions new send-welcome-email
   ```

2. **Código de la función:**
   ```typescript
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

   serve(async (req) => {
     const { email } = await req.json()
     
     // Enviar email usando Resend o similar
     const response = await fetch('https://api.resend.com/emails', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         from: 'FinnVest <noreply@finnvest.com>',
         to: email,
         subject: '¡Bienvenido a FinnVest! 🚀',
         html: `... tu template HTML ...`
       })
     })
     
     return new Response(JSON.stringify({ success: true }), {
       headers: { 'Content-Type': 'application/json' },
     })
   })
   ```

## 📧 Servicios de Email Recomendados

### 1. Resend (Recomendado)
- **Precio:** 3,000 emails gratis/mes
- **Configuración:** Muy fácil
- **API:** Excelente

### 2. SendGrid
- **Precio:** 100 emails gratis/día
- **Configuración:** Fácil
- **API:** Muy buena

### 3. Mailgun
- **Precio:** 5,000 emails gratis/mes
- **Configuración:** Media
- **API:** Buena

## 🔧 Configuración en el Código

### Actualizar supabase-config.js

```javascript
// Función para enviar email de bienvenida
async function sendWelcomeEmail(email) {
  if (!supabase) {
    return { success: false, error: 'Supabase no está configurado' };
  }
  
  try {
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email: email }
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
}
```

## 🧪 Testing

### Probar el envío de emails:
1. Registra un email de prueba
2. Verifica que llegue el email de bienvenida
3. Revisa los logs en Supabase

### Monitoreo:
- **Supabase Dashboard:** Ver logs de funciones
- **Email Service Dashboard:** Ver estadísticas de envío
- **Spam Folder:** Verificar que no vaya a spam

## 🚨 Troubleshooting

### Problemas comunes:
1. **Email no llega:** Verificar configuración SMTP
2. **Error de autenticación:** Revisar credenciales
3. **Spam:** Configurar SPF/DKIM records
4. **Rate limiting:** Respetar límites del servicio

---

**¡Con esto tendrás emails automáticos funcionando! 🎉** 