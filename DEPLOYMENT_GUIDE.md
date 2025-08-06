# Guía de Despliegue - FinnVest Website

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
