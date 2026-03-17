-- Admin Setup SQL - Run this ONCE in Supabase Dashboard → SQL Editor after running supabase-schema.sql
-- Sets user arunm13032003@gmail.com as ADMIN (only one admin)

-- 1. Find the user ID
SELECT id, email, created_at FROM auth.users WHERE email = 'arunm13032003@gmail.com';

-- 2. Insert profile if not exists (triggers after schema run, but safe)
INSERT INTO public.profiles (id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'arunm13032003@gmail.com'),
  'admin'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Force update to admin role
UPDATE public.profiles 
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'arunm13032003@gmail.com');

-- 4. Verify
SELECT p.id, p.role, u.email 
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'arunm13032003@gmail.com';

-- ✅ Now login with arunm13032003@gmail.com → Admin access granted!
-- All other new signups auto-default to 'user' role via trigger.

