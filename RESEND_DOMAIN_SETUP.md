# Configuración de Dominio en Resend

## 🔍 **PROBLEMA ACTUAL:**
Con el dominio de prueba `onboarding@resend.dev`, solo puedes enviar emails a tu propia dirección.

## 🛠️ **SOLUCIÓN: Configurar tu dominio**

### **PASO 1: Comprar dominio (si no tienes uno)**
1. Ve a [Namecheap.com](https://namecheap.com) o [GoDaddy.com](https://godaddy.com)
2. Compra un dominio (ej: `finnvest.com`, `finnvest.co`, etc.)
3. Precio: ~$10-15/año

### **PASO 2: Configurar dominio en Resend**
1. Ve a [resend.com/domains](https://resend.com/domains)
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `finnvest.com`) - **SIN https://**
4. Selecciona la región más cercana
5. Haz clic en **"Add Domain"**

### **PASO 3: Configurar registros DNS**
Resend te dará registros DNS como estos:
```
Type: TXT
Name: @
Value: resend-verification=abc123...

Type: CNAME
Name: resend
Value: track.resend.com
```

1. Ve al panel de control de tu proveedor de dominio
2. Busca la sección **DNS Management** o **DNS Records**
3. Agrega los registros que te dio Resend
4. Espera 5-10 minutos para que se propaguen

### **PASO 4: Verificar dominio**
1. Regresa a Resend
2. El dominio debería cambiar de "Pending" a "Active"
3. Ahora puedes usar `noreply@tudominio.com`

### **PASO 5: Actualizar Edge Function**
Cambia el `from` en la Edge Function:
```typescript
from: 'FinnVest <noreply@tudominio.com>',
```

## 🚀 **ALTERNATIVA RÁPIDA (TEMPORAL):**

Si no quieres comprar un dominio ahora, puedes:

### **Opción A: Usar solo tu email para pruebas**
1. Cambia temporalmente el código para enviar solo a tu email
2. Prueba que todo funciona
3. Luego configura el dominio

### **Opción B: Usar servicio de email gratuito**
1. Configura Gmail SMTP
2. O usa SendGrid (100 emails/día gratis)

## 📧 **CONFIGURACIÓN TEMPORAL:**

Mientras configuras el dominio, puedes modificar la Edge Function para enviar solo a tu email:

```typescript
// Enviar solo a tu email para pruebas
const testEmail = 'j.nievesh@uniandes.edu.co';
const emailToSend = email === testEmail ? email : testEmail;

body: JSON.stringify({
  from: 'FinnVest <onboarding@resend.dev>',
  to: emailToSend,
  subject: '¡Bienvenido a FinnVest! 🚀 Tu lugar está reservado',
  html: emailContent,
}),
```

## ✅ **RESULTADO FINAL:**
- ✅ Emails a cualquier dirección
- ✅ Dominio profesional
- ✅ Mejor deliverability
- ✅ Sin limitaciones de prueba

## 💰 **COSTOS:**
- **Dominio**: ~$10-15/año
- **Resend**: 100 emails/día gratis
- **Total**: ~$1/mes

¿Quieres que te ayude con alguna de estas opciones?
