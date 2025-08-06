# Guía de Despliegue - FinnVest Website

## 🚀 Opciones de Despliegue Gratuito

### 1. Netlify (Recomendado) - Más Fácil

**Ventajas:**
- ✅ Despliegue automático desde GitHub
- ✅ HTTPS automático
- ✅ Dominio personalizado gratuito
- ✅ Muy fácil de configurar
- ✅ Perfecto para sitios estáticos

**Pasos:**

1. **Preparar el repositorio:**
   ```bash
   # Asegúrate de que todos los archivos estén en GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Conectar con Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Crea una cuenta gratuita
   - Haz clic en "New site from Git"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio `Finnvest-Website`

3. **Configurar el despliegue:**
   - **Build command:** (dejar vacío - no necesitamos build)
   - **Publish directory:** `.` (directorio raíz)
   - Haz clic en "Deploy site"

4. **Configurar variables de entorno (para Supabase):**
   - Ve a **Site settings** > **Environment variables**
   - Agrega:
     - `SUPABASE_URL`: Tu URL de Supabase
     - `SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

5. **Dominio personalizado (opcional):**
   - Ve a **Domain settings**
   - Puedes usar el dominio gratuito de Netlify o conectar tu dominio personalizado

### 2. Vercel - Excelente para React/Next.js

**Ventajas:**
- ✅ Despliegue automático
- ✅ Excelente rendimiento
- ✅ HTTPS automático
- ✅ Muy rápido

**Pasos:**
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura como proyecto estático
4. Despliega automáticamente

### 3. GitHub Pages - Gratis y Directo

**Ventajas:**
- ✅ Totalmente gratuito
- ✅ Integrado con GitHub
- ✅ HTTPS automático

**Pasos:**

1. **Habilitar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - **Settings** > **Pages**
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
   - Haz clic en **Save**

2. **Tu sitio estará disponible en:**
   ```
   https://mariaecheverrie.github.io/Finnvest-Website
   ```

3. **Configurar Supabase para producción:**
   - Asegúrate de que las credenciales de Supabase estén configuradas
   - El archivo `supabase-config.js` debe tener las credenciales reales

### 4. Firebase Hosting - Google

**Ventajas:**
- ✅ Muy rápido
- ✅ Integración con otros servicios de Google
- ✅ CDN global

**Pasos:**
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa: `firebase init hosting`
4. Despliega: `firebase deploy`

## 🔧 Configuración Post-Despliegue

### Configurar Supabase para Producción

1. **Actualizar políticas de CORS en Supabase:**
   - Ve a tu proyecto de Supabase
   - **Settings** > **API**
   - En **CORS Origins**, agrega tu dominio de producción:
     ```
     https://tu-sitio.netlify.app
     https://mariaecheverrie.github.io
     ```

2. **Verificar credenciales:**
   - Asegúrate de que `supabase-config.js` tenga las credenciales correctas
   - No subas este archivo a GitHub (ya está en .gitignore)

### Configurar Variables de Entorno (Netlify/Vercel)

Si usas Netlify o Vercel, puedes configurar las credenciales como variables de entorno:

1. **En Netlify:**
   - **Site settings** > **Environment variables**
   - Agrega:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`

2. **Actualizar supabase-config.js:**
   ```javascript
   const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
   ```

## 📱 Dominio Personalizado

### Opciones Gratuitas:
- **Netlify:** `tu-sitio.netlify.app`
- **Vercel:** `tu-sitio.vercel.app`
- **GitHub Pages:** `mariaecheverrie.github.io/Finnvest-Website`

### Dominio Personalizado:
1. Compra un dominio (GoDaddy, Namecheap, etc.)
2. Configura los DNS records
3. Conecta con tu plataforma de hosting

## 🧪 Testing Post-Despliegue

1. **Probar formularios de waitlist:**
   - Registra un email de prueba
   - Verifica que aparezca en Supabase

2. **Probar responsividad:**
   - Móvil, tablet, desktop
   - Diferentes navegadores

3. **Probar funcionalidades:**
   - Cambio de idioma
   - Navegación
   - Animaciones

## 🚨 Troubleshooting

### Problemas Comunes:

1. **Supabase no funciona en producción:**
   - Verifica CORS origins
   - Revisa las credenciales
   - Verifica las políticas RLS

2. **Archivos no se cargan:**
   - Verifica las rutas de los archivos
   - Asegúrate de que todos los archivos estén en el repositorio

3. **Errores de JavaScript:**
   - Revisa la consola del navegador
   - Verifica que Supabase esté cargado correctamente

## 📊 Monitoreo

### Herramientas Gratuitas:
- **Google Analytics:** Para métricas de visitantes
- **Supabase Dashboard:** Para monitorear la base de datos
- **Netlify Analytics:** Si usas Netlify

### Métricas Importantes:
- Número de registros en waitlist
- Tiempo de carga de la página
- Tasa de conversión de formularios

## 🔄 Actualizaciones

### Para actualizar el sitio:
1. Haz cambios en tu código local
2. Haz commit y push a GitHub
3. El sitio se actualizará automáticamente (Netlify/Vercel)
4. Para GitHub Pages, puede tomar unos minutos

---

**¡Tu sitio estará listo para recibir visitantes! 🎉** 