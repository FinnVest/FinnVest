# Configuración de Resend para Emails Automáticos

## 🚀 Paso 1: Crear cuenta en Resend

1. **Ve a [resend.com](https://resend.com)**
2. **Crea una cuenta gratuita**
3. **Verifica tu email**

## 🔑 Paso 2: Obtener API Key

1. **En el dashboard de Resend, ve a "API Keys"**
2. **Crea una nueva API Key**
3. **Copia la clave** (empieza con `re_`)

## 📧 Paso 3: Configurar Dominio (Opcional)

Para emails más profesionales:
1. **Ve a "Domains" en Resend**
2. **Agrega tu dominio** (ej: `finnvest.com`)
3. **Configura los registros DNS** que te indique Resend

## 🔧 Paso 4: Configurar Supabase Edge Function

### 4.1 Instalar Supabase CLI
```bash
npm install -g supabase
```

### 4.2 Iniciar sesión en Supabase
```bash
supabase login
```

### 4.3 Conectar a tu proyecto
```bash
supabase link --project-ref TU_PROJECT_ID
```

### 4.4 Crear la Edge Function
```bash
supabase functions new send-welcome-email
```

### 4.5 Configurar variables de entorno
```bash
supabase secrets set RESEND_API_KEY=re_tu_api_key_aqui
```

### 4.6 Desplegar la función
```bash
supabase functions deploy send-welcome-email
```

## 🎯 Paso 5: Probar el Sistema

1. **Registra un email de prueba en tu sitio**
2. **Verifica que llegue el email de bienvenida**
3. **Revisa los logs en Supabase Dashboard**

## 📊 Monitoreo

- **Resend Dashboard:** Ver estadísticas de envío
- **Supabase Dashboard:** Ver logs de la función
- **Spam Folder:** Verificar que no vaya a spam

---

**¡Con esto tendrás emails automáticos funcionando! 🎉** 