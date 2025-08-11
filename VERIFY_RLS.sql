-- Verificar y arreglar políticas RLS
-- Ejecuta esto en tu Supabase SQL Editor

-- 1. Verificar si RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';

-- 2. Verificar políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'waitlist';

-- 3. Si no hay políticas, crearlas
-- Primero eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Allow insert from frontend" ON waitlist;
DROP POLICY IF EXISTS "Allow select from frontend" ON waitlist;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON waitlist;
DROP POLICY IF EXISTS "Enable read access for all users" ON waitlist;

-- 4. Crear nuevas políticas
CREATE POLICY "Allow insert from frontend" ON waitlist
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow select from frontend" ON waitlist
    FOR SELECT 
    USING (true);

-- 5. Verificar que se crearon
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'waitlist';

-- 6. Probar la consulta que está fallando
SELECT email FROM waitlist WHERE email = 'test@example.com' LIMIT 1;
