-- Fix RLS Policies for Waitlist Table
-- Run this in your Supabase SQL Editor

-- First, let's check the current policies
SELECT * FROM pg_policies WHERE tablename = 'waitlist';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert from frontend" ON waitlist;
DROP POLICY IF EXISTS "Allow select from frontend" ON waitlist;

-- Create new policies with proper permissions
CREATE POLICY "Allow insert from frontend" ON waitlist
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow select from frontend" ON waitlist
    FOR SELECT 
    USING (true);

-- Alternative: If you want to allow only specific operations
-- CREATE POLICY "Allow email check" ON waitlist
--     FOR SELECT 
--     USING (true);

-- CREATE POLICY "Allow email insert" ON waitlist
--     FOR INSERT 
--     WITH CHECK (true);

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'waitlist';

-- Test the policies
-- This should work now:
-- SELECT email FROM waitlist WHERE email = 'test@example.com' LIMIT 1;
