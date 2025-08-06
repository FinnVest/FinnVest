# 🚀 Configuración Rápida de Emails - 5 Minutos

## ⚡ Paso 1: Crear cuenta en Resend (2 min)

1. **Ve a [resend.com](https://resend.com)**
2. **Crea cuenta gratuita** (3,000 emails/mes gratis)
3. **Verifica tu email**

## 🔑 Paso 2: Obtener API Key (1 min)

1. **En Resend Dashboard → API Keys**
2. **Create API Key**
3. **Copia la clave** (empieza con `re_`)

## 🔧 Paso 3: Configurar Supabase (2 min)

### Opción A: Variables de Entorno (Recomendado)

1. **Ve a tu proyecto de Supabase**
2. **Settings → Edge Functions**
3. **Environment Variables → Add**
4. **Agrega:**
   ```
   RESEND_API_KEY = re_tu_api_key_aqui
   ```

### Opción B: Configuración Local

Si estás desarrollando localmente:

1. **Instala Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Inicia sesión:**
   ```bash
   supabase login
   ```

3. **Conecta tu proyecto:**
   ```bash
   supabase link --project-ref TU_PROJECT_ID
   ```

4. **Configura la variable:**
   ```bash
   supabase secrets set RESEND_API_KEY=re_tu_api_key_aqui
   ```

5. **Despliega la función:**
   ```bash
   supabase functions deploy send-welcome-email
   ```

## 🎯 Paso 4: Probar (1 min)

1. **Registra un email en tu sitio**
2. **Verifica que llegue el email de bienvenida**
3. **¡Listo! 🎉**

## 📧 Template de Email Incluido

El email de bienvenida incluye:
- ✅ Diseño profesional y responsive
- ✅ Colores de FinnVest
- ✅ Información sobre las características
- ✅ Beneficios para early adopters
- ✅ Enlaces a redes sociales
- ✅ Footer con información legal

## 🚨 Si algo no funciona

### Email no llega:
1. **Revisa spam folder**
2. **Verifica API key en Supabase**
3. **Revisa logs en Resend Dashboard**

### Error de configuración:
1. **Verifica que la variable esté configurada**
2. **Revisa que el Project ID sea correcto**
3. **Asegúrate de que la función esté desplegada**

## 💰 Costos

- **Plan Gratuito:** 3,000 emails/mes
- **Plan Pro:** $20/mes por 50,000 emails
- **Sin costos ocultos**

---

**¡Con esto tendrás emails automáticos funcionando en 5 minutos! 🚀** 