# Guía de Despliegue para Windows - FinnVest Website

## 🪟 Despliegue desde Windows

### Opción 1: Netlify (Recomendado) - Sin Código

**Pasos:**

1. **Preparar archivos:**
   - Asegúrate de que todos los archivos estén en tu repositorio de GitHub
   - Verifica que `supabase-config.js` tenga las credenciales correctas

2. **Conectar con Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Crea una cuenta gratuita
   - Haz clic en **"New site from Git"**
   - Selecciona **GitHub**
   - Busca y selecciona tu repositorio `Finnvest-Website`

3. **Configurar despliegue:**
   - **Build command:** (dejar vacío)
   - **Publish directory:** `.` (punto)
   - Haz clic en **"Deploy site"**

4. **Configurar variables de entorno:**
   - Ve a **Site settings** > **Environment variables**
   - Agrega:
     - `SUPABASE_URL`: Tu URL de Supabase
     - `SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

5. **Tu sitio estará disponible en:**
   ```
   https://tu-sitio.netlify.app
   ```

### Opción 2: GitHub Pages - Directo desde GitHub

**Pasos:**

1. **Habilitar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - **Settings** > **Pages**
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
   - Haz clic en **Save**

2. **Tu sitio estará en:**
   ```
   https://mariaecheverrie.github.io/Finnvest-Website
   ```

### Opción 3: Vercel - Muy Fácil

**Pasos:**

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta con GitHub
3. **New Project**
4. Importa tu repositorio `Finnvest-Website`
5. **Framework Preset:** Other
6. Haz clic en **Deploy**

## 🔧 Configuración de Supabase para Producción

### 1. Configurar CORS en Supabase

1. Ve a tu proyecto de Supabase
2. **Settings** > **API**
3. En **CORS Origins**, agrega:
   ```
   https://tu-sitio.netlify.app
   https://mariaecheverrie.github.io
   https://tu-sitio.vercel.app
   ```

### 2. Verificar Credenciales

Asegúrate de que `supabase-config.js` tenga las credenciales correctas:

```javascript
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-clave-anonima-real';
```

## 📁 Estructura de Archivos Requerida

Asegúrate de tener estos archivos en tu repositorio:

```
Finnvest-Website/
├── index.html              ✅
├── styles.css              ✅
├── script.js               ✅
├── supabase-config.js      ✅ (con credenciales reales)
├── logo.png                ✅
├── finnvest.png            ✅
├── landing.png             ✅
├── netlify.toml            ✅ (para Netlify)
├── .gitignore              ✅
└── README.md               ✅
```

## 🚀 Comandos Útiles en Windows

### Usando PowerShell:

```powershell
# Verificar estado de Git
git status

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "Ready for deployment"

# Subir a GitHub
git push origin main

# Verificar archivos
dir
```

### Usando Git Bash (si lo tienes instalado):

```bash
# Ejecutar el script de despliegue
./deploy.sh
```

## 🧪 Testing Post-Despliegue

### 1. Probar Formularios
- Abre tu sitio desplegado
- Intenta registrarte con un email
- Verifica que aparezca en Supabase

### 2. Probar Responsividad
- Abre las herramientas de desarrollador (F12)
- Cambia el tamaño de la ventana
- Prueba en móvil, tablet, desktop

### 3. Probar Funcionalidades
- Cambio de idioma
- Navegación suave
- Animaciones
- Formularios de waitlist

## 🚨 Troubleshooting en Windows

### Problema: "chmod no se reconoce"
**Solución:** En Windows, no necesitas chmod. Los archivos .sh se ejecutan con Git Bash o WSL.

### Problema: Archivos no se cargan
**Solución:** Verifica que todos los archivos estén en el repositorio de GitHub.

### Problema: Supabase no funciona
**Solución:** 
1. Verifica CORS origins en Supabase
2. Revisa las credenciales en `supabase-config.js`
3. Verifica la consola del navegador (F12)

### Problema: Caracteres especiales en nombres de archivos
**Solución:** Evita usar caracteres especiales en nombres de archivos.

## 📊 Monitoreo

### Herramientas Gratuitas:
- **Google Analytics:** Para métricas de visitantes
- **Supabase Dashboard:** Para monitorear la base de datos
- **Netlify Analytics:** Si usas Netlify

### Verificar Funcionamiento:
1. Abre tu sitio desplegado
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña **Console**
4. Verifica que no haya errores
5. Prueba el formulario de waitlist

## 🔄 Actualizaciones

### Para actualizar el sitio:
1. Haz cambios en tu código local
2. Haz commit y push a GitHub
3. El sitio se actualizará automáticamente

### Tiempos de actualización:
- **Netlify:** 1-2 minutos
- **Vercel:** 30 segundos - 1 minuto
- **GitHub Pages:** 2-5 minutos

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs de tu plataforma de hosting
3. Consulta la documentación de la plataforma
4. Revisa `DEPLOYMENT_GUIDE.md` para más detalles

---

**¡Tu sitio estará listo para recibir visitantes! 🎉** 