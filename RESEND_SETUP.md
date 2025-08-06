# Configuración de Resend para Emails Automáticos

## 📧 ¿Qué es Resend?

Resend es un servicio de email moderno y confiable que ofrece:
- ✅ 3,000 emails gratis por mes
- ✅ API muy fácil de usar
- ✅ Excelente deliverability
- ✅ Templates HTML preciosos
- ✅ Analytics en tiempo real

## 🚀 Configuración Rápida

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Obtener API Key

1. Ve a **API Keys** en tu dashboard
2. Haz clic en **Create API Key**
3. Dale un nombre como "FinnVest Emails"
4. Copia la API key (empieza con `re_`)

### 3. Configurar dominio (opcional pero recomendado)

1. Ve a **Domains**
2. Agrega tu dominio (ej: `finnvest.com`)
3. Configura los registros DNS que te indique
4. Espera la verificación (puede tomar hasta 24 horas)

### 4. Configurar en Supabase

#### Opción A: Variables de Entorno (Recomendado)

1. Ve a tu proyecto de Supabase
2. **Settings > Edge Functions**
3. En **Environment Variables**, agrega:
   ```
   RESEND_API_KEY = re_tu_api_key_aqui
   ```

#### Opción B: Configuración Local

Si estás desarrollando localmente, crea un archivo `.env.local`:
```
RESEND_API_KEY=re_tu_api_key_aqui
```

## 🔧 Configuración de la Edge Function

### 1. Instalar Supabase CLI (si no lo tienes)

```bash
npm install -g supabase
```

### 2. Iniciar sesión en Supabase

```bash
supabase login
```

### 3. Vincular tu proyecto

```bash
supabase link --project-ref tu-project-ref
```

### 4. Desplegar la Edge Function

```bash
supabase functions deploy send-welcome-email
```

## 📧 Template de Email Personalizado

El template incluido en la Edge Function incluye:

- ✅ Diseño responsive
- ✅ Colores de FinnVest
- ✅ Información sobre las características
- ✅ Beneficios para early adopters
- ✅ Enlaces a redes sociales
- ✅ Footer con información legal

### Personalizar el Template

Puedes editar el template en `supabase/functions/send-welcome-email/index.ts`:

1. **Cambiar colores:** Busca `#667eea` y `#1e40af`
2. **Cambiar contenido:** Edita el texto dentro del template
3. **Agregar logo:** Incluye una imagen de tu logo
4. **Cambiar redes sociales:** Actualiza los enlaces

## 🧪 Testing

### 1. Probar localmente

```bash
supabase functions serve send-welcome-email
```

### 2. Probar con curl

```bash
curl -X POST http://localhost:54321/functions/v1/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email": "tu-email@ejemplo.com"}'
```

### 3. Probar en producción

1. Registra un email real en tu waitlist
2. Verifica que llegue el email
3. Revisa los logs en Supabase Dashboard

## 📊 Monitoreo

### En Resend Dashboard:
- **Analytics:** Ver estadísticas de envío
- **Logs:** Ver emails enviados y errores
- **Domains:** Verificar estado de dominios

### En Supabase Dashboard:
- **Edge Functions:** Ver logs de la función
- **Database:** Ver registros en la tabla waitlist

## 🚨 Troubleshooting

### Problema: "RESEND_API_KEY not configured"
**Solución:** Verifica que la variable de entorno esté configurada en Supabase.

### Problema: Email no llega
**Solución:** 
1. Verifica que el email no esté en spam
2. Revisa los logs en Resend Dashboard
3. Verifica que el dominio esté configurado

### Problema: Error 400
**Solución:** 
1. Verifica que el email sea válido
2. Revisa que la API key sea correcta
3. Verifica los logs de la Edge Function

## 💰 Costos

### Plan Gratuito:
- 3,000 emails por mes
- 100 emails por día
- Soporte por email

### Plan Pro ($20/mes):
- 50,000 emails por mes
- Soporte prioritario
- Analytics avanzados

## 🔄 Actualizaciones

### Para actualizar la Edge Function:

```bash
supabase functions deploy send-welcome-email
```

### Para cambiar el template:
1. Edita el archivo `index.ts`
2. Despliega la función
3. Prueba con un email de test

---

**¡Con esto tendrás emails automáticos profesionales funcionando! 🎉** 