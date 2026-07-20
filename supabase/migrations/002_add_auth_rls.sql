-- Add RLS policies for authenticated users (admins) to perform CRUD operations
-- Since this is an admin-only system without public sign-ups, any authenticated user is an admin.

DO $$
DECLARE
  table_name text;
  tables text[] := ARRAY['homepage', 'statistics', 'contacts', 'tourism', 'umkm', 'news', 'gallery', 'village_profile'];
BEGIN
  FOREACH table_name IN ARRAY tables LOOP
    EXECUTE format('
      CREATE POLICY "Authenticated insert access" ON %I FOR INSERT TO authenticated WITH CHECK (true);
      CREATE POLICY "Authenticated update access" ON %I FOR UPDATE TO authenticated USING (true);
      CREATE POLICY "Authenticated delete access" ON %I FOR DELETE TO authenticated USING (true);
    ', table_name, table_name, table_name);
  END LOOP;
END
$$;
