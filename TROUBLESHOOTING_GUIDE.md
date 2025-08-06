# Guía de Solución de Problemas - FinnVest

## 🔍 **PROBLEMAS IDENTIFICADOS:**

1. **Error 406 (Not Acceptable)** - Políticas RLS no configuradas correctamente
2. **Error CORS** - Edge Function no accesible desde el frontend

## 🛠️ **SOLUCIÓN PASO A PASO:**

### **PASO 1: Arreglar Políticas RLS (Error 406)**

1. **Ve a tu Supabase Dashboard**
2. **Ve a SQL Editor**
3. **Copia y pega el contenido de `VERIFY_RLS.sql`**
4. **Ejecuta el SQL completo**
5. **Verifica que aparezcan 2 políticas en los resultados**

### **PASO 2: Configurar Resend**

1. **Ve a [resend.com](https://resend.com)**
2. **Crea cuenta gratuita**
3. **Ve a API Keys → Create API Key**
4. **Copia la clave** (empieza con `re_`)

### **PASO 3: Configurar Variable de Entorno en Supabase**

1. **En Supabase Dashboard, ve a Settings → Edge Functions**
2. **En Environment Variables, agrega:**
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_tu_api_key_aqui` (la que copiaste de Resend)

### **PASO 4: Redesplegar Edge Function**

1. **Ve a Edge Functions en Supabase**
2. **Si ya existe `send-welcome-email`, elimínala**
3. **Crea nueva función:**
   - **Nombre**: `send-welcome-email`
   - **Copia el código de `supabase/functions/send-welcome-email/index.ts`**
4. **Haz clic en Deploy**

### **PASO 5: Verificar Configuración**

1. **En Edge Functions, verifica que:**
   - La función aparece en la lista
   - El estado es "Active"
   - No hay errores en los logs

## 🧪 **PRUEBA DESPUÉS DE CADA PASO:**

### **Después del Paso 1 (RLS):**
- Recarga la página
- Prueba registrar un email
- Ya no debería aparecer error 406

### **Después del Paso 4 (Edge Function):**
- Recarga la página
- Prueba registrar un email
- Deberías recibir el email de bienvenida

## 🔍 **VERIFICACIÓN DE LOGS:**

### **En Supabase Dashboard:**
1. Ve a **Edge Functions → send-welcome-email**
2. Haz clic en **Logs**
3. Deberías ver logs como:
   - "Edge Function called"
   - "Email received: [email]"
   - "Email sent successfully"

### **En Resend Dashboard:**
1. Ve a **Emails**
2. Deberías ver los emails enviados
3. Verifica el estado (delivered, failed, etc.)

## ⚠️ **SI SIGUEN LOS ERRORES:**

### **Error 406 persiste:**
- Ejecuta el SQL de `VERIFY_RLS.sql` nuevamente
- Verifica que aparezcan 2 políticas en los resultados

### **Error CORS persiste:**
- Verifica que la Edge Function esté "Active"
- Revisa los logs de la función
- Asegúrate de que la variable `RESEND_API_KEY` esté configurada

### **Email no llega:**
- Verifica que la API Key de Resend sea correcta
- Revisa la carpeta de spam
- Verifica los logs de Resend

## 📞 **SOPORTE:**

Si los problemas persisten:
1. Revisa los logs de Supabase
2. Verifica la configuración de Resend
3. Asegúrate de que todos los pasos se ejecutaron correctamente

## ✅ **RESULTADO FINAL:**

Después de completar todos los pasos:
- ✅ Registro en Supabase sin errores
- ✅ Emails automáticos funcionando
- ✅ Template profesional de bienvenida
- ✅ Sistema completo operativo
