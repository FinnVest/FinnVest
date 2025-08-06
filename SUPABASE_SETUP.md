# Configuración de Supabase para Waitlist

## 1. Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

## 2. Configurar la base de datos

### Crear la tabla `waitlist`

En el SQL Editor de Supabase, ejecuta este código:

```sql
-- Crear tabla waitlist
CREATE TABLE waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active',
    source VARCHAR(100) DEFAULT 'website'
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);
CREATE INDEX idx_waitlist_status ON waitlist(status);

-- Habilitar Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones desde el frontend
CREATE POLICY "Allow insert from frontend" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Crear política para permitir consultas desde el frontend
CREATE POLICY "Allow select from frontend" ON waitlist
    FOR SELECT USING (true);
```

## 3. Obtener credenciales

1. Ve a **Settings** > **API** en tu proyecto de Supabase
2. Copia la **URL** del proyecto
3. Copia la **anon public** key

## 4. Configurar el archivo `supabase-config.js`

Reemplaza las siguientes líneas en `supabase-config.js`:

```javascript
const SUPABASE_URL = 'TU_URL_DE_SUPABASE';
const SUPABASE_ANON_KEY = 'TU_CLAVE_ANONIMA_DE_SUPABASE';
```

## 5. Probar la funcionalidad

1. Abre tu landing page en el navegador
2. Intenta registrarte con un email
3. Verifica en la tabla `waitlist` de Supabase que el email se haya guardado

## 6. Funcionalidades implementadas

- ✅ Validación de email
- ✅ Verificación de emails duplicados
- ✅ Mensajes de éxito/error
- ✅ Estados de carga
- ✅ Persistencia en base de datos
- ✅ Seguridad con RLS

## 7. Monitoreo y análisis

Puedes ver los registros en tiempo real en:
- **Table Editor** > **waitlist** en Supabase
- **SQL Editor** para consultas personalizadas

### Consultas útiles:

```sql
-- Ver todos los registros
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Contar total de registros
SELECT COUNT(*) FROM waitlist;

-- Ver registros de hoy
SELECT * FROM waitlist WHERE DATE(created_at) = CURRENT_DATE;

-- Ver registros por fuente (si agregas más formularios)
SELECT source, COUNT(*) FROM waitlist GROUP BY source;
```

## 8. Próximos pasos (opcionales)

- Configurar notificaciones por email
- Agregar más campos (nombre, país, etc.)
- Implementar analytics
- Crear dashboard de administración 