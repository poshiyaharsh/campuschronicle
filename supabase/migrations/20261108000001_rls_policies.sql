-- ========================================================
-- CampusChronicle - Row Level Security (RLS) Policies
-- Migration: 20261108000001_rls_policies.sql
-- ========================================================

-- Enable RLS across all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if authenticated user has admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------------------
-- 1. Profiles Policies
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Profiles are readable by authenticated users" ON profiles;
CREATE POLICY "Profiles are readable by authenticated users" ON profiles
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "Admins have full access to profiles" ON profiles;
CREATE POLICY "Admins have full access to profiles" ON profiles
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- --------------------------------------------------------
-- 2. Categories Policies
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;
CREATE POLICY "Public categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- --------------------------------------------------------
-- 3. Albums Policies
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Published albums viewable by everyone" ON albums;
CREATE POLICY "Published albums viewable by everyone" ON albums
    FOR SELECT USING (is_published = true OR is_admin());

DROP POLICY IF EXISTS "Admins can manage albums" ON albums;
CREATE POLICY "Admins can manage albums" ON albums
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- --------------------------------------------------------
-- 4. Events Policies
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Published events viewable by everyone" ON events;
CREATE POLICY "Published events viewable by everyone" ON events
    FOR SELECT USING (is_published = true OR is_admin());

DROP POLICY IF EXISTS "Admins can manage events" ON events;
CREATE POLICY "Admins can manage events" ON events
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- --------------------------------------------------------
-- 5. Media Policies
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Published media viewable by everyone" ON media;
CREATE POLICY "Published media viewable by everyone" ON media
    FOR SELECT USING (is_published = true OR is_admin());

DROP POLICY IF EXISTS "Admins can manage media" ON media;
CREATE POLICY "Admins can manage media" ON media
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- --------------------------------------------------------
-- 6. Site Settings Policies
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Site settings viewable by everyone" ON site_settings;
CREATE POLICY "Site settings viewable by everyone" ON site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can update site settings" ON site_settings;
CREATE POLICY "Admins can update site settings" ON site_settings
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
