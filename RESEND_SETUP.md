# Configuración de Resend para Emails Automáticos

## 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita (100 emails/día gratis)
3. Verifica tu dominio o usa el dominio de prueba

## 2. Obtener API Key

1. En el dashboard de Resend, ve a **API Keys**
2. Crea una nueva API Key
3. Copia la clave (empieza con `re_`)

## 3. Configurar en Supabase

### Opción A: Usando Supabase CLI

```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Login a Supabase
supabase login

# Link tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Configurar variable de entorno
supabase secrets set RESEND_API_KEY=re_tu_api_key_aqui

# Desplegar la Edge Function
supabase functions deploy send-welcome-email
```

### Opción B: Usando Dashboard de Supabase

1. Ve a tu proyecto de Supabase
2. Ve a **Settings** > **Edge Functions**
3. En **Environment Variables**, agrega:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_tu_api_key_aqui`

4. Ve a **Edge Functions** > **Create Function**
5. Nombre: `send-welcome-email`
6. Copia el código de `supabase/functions/send-welcome-email/index.ts`
7. Haz clic en **Deploy**

## 4. Verificar configuración

1. Ve a **Edge Functions** en Supabase
2. Deberías ver `send-welcome-email` en la lista
3. El estado debe ser "Active"

## 5. Probar el email

1. Registra un email en tu landing page
2. Deberías recibir el email de bienvenida
3. Verifica en **Logs** de Supabase si hay errores

## 6. Personalizar el email

Edita el archivo `supabase/functions/send-welcome-email/index.ts` para:
- Cambiar el diseño del email
- Modificar el contenido
- Agregar tu logo
- Cambiar colores

## 7. Monitoreo

- **Resend Dashboard**: Ve emails enviados, entregados, etc.
- **Supabase Logs**: Ve errores de la Edge Function
- **Analytics**: Track engagement de emails

## 8. Troubleshooting

### Error: "RESEND_API_KEY not configured"
- Verifica que la variable de entorno esté configurada
- Reinicia la Edge Function

### Error: "Failed to send email"
- Verifica que la API Key sea válida
- Asegúrate de que el dominio esté verificado en Resend

### Error: "CORS policy"
- La Edge Function ya incluye headers CORS
- Verifica que esté desplegada correctamente

## 9. Costos

- **Resend**: 100 emails/día gratis, luego $0.80/1000 emails
- **Supabase**: Edge Functions incluidas en el plan gratuito

## 10. Próximos pasos

- Configurar templates de email más avanzados
- Agregar tracking de apertura
- Implementar emails de seguimiento
- Configurar listas de distribución 