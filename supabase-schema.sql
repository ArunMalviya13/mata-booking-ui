-- Mata Booking UI - Complete Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor (New Query)
-- 1. Enable UUID extension (if not already)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bookings Table (REQUIRED - fixes 500 error)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    booking_date DATE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Unique Constraints (error handling expects these)
CREATE UNIQUE INDEX IF NOT EXISTS bookings_booking_date_unique ON bookings(booking_date);

CREATE UNIQUE INDEX IF NOT EXISTS bookings_user_date_unique ON bookings(user_id, booking_date);

-- 4. Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_bookings_updated_at BEFORE
UPDATE
    ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable RLS (REQUIRED for client-side security)
ALTER TABLE
    bookings ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;

CREATE POLICY "Users can view own bookings" ON bookings FOR
SELECT
    USING (auth.uid() :: uuid = user_id);

DROP POLICY IF EXISTS "Users can insert own bookings" ON bookings;

CREATE POLICY "Users can insert own bookings" ON bookings FOR
INSERT
    WITH CHECK (auth.uid() :: uuid = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;

CREATE POLICY "Users can update own bookings" ON bookings FOR
UPDATE
    USING (auth.uid() :: uuid = user_id);

DROP POLICY IF EXISTS "Users can delete own bookings" ON bookings;

CREATE POLICY "Users can delete own bookings" ON bookings FOR DELETE USING (auth.uid() :: uuid = user_id);

-- 7. Profiles Table (for admin features - optional but recommended)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE
    profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR
SELECT
    USING (auth.uid() :: uuid = id);

CREATE POLICY "Users can insert own profile" ON profiles FOR
INSERT
    WITH CHECK (auth.uid() :: uuid = id);

-- 8. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- 9. Auto-Profile Creation Trigger (NEW: Sets new users to 'user' role automatically)

-- Function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 10. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- 11. Verify setup
SELECT 'Bookings table created successfully!' as status;
SELECT COUNT(*) as bookings_count FROM bookings;
SELECT COUNT(*) as profiles_count FROM profiles;

-- 🎉 Done! Run admin-setup.sql next to set your admin user.
-- New signups auto get 'user' role. Admin gets special access.
