-- ============================================================
-- Nexus Operations Full Schema
-- ============================================================

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'homeowner' CHECK (role IN ('homeowner', 'contractor', 'admin')),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'KS',
  zip TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
-- Contractors can be viewed by homeowners (for assignment context)
CREATE POLICY "profiles_select_contractors" ON public.profiles FOR SELECT USING (role = 'contractor');

-- CONTRACTOR PROFILES (extended)
CREATE TABLE IF NOT EXISTS public.contractor_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT,
  license_number TEXT,
  insurance_provider TEXT,
  insurance_expiry DATE,
  service_area TEXT[] DEFAULT '{}',
  trade_categories TEXT[] DEFAULT '{}',
  hourly_rate NUMERIC(10,2),
  flat_rate NUMERIC(10,2),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating NUMERIC(3,2) DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  stripe_account_id TEXT,
  payment_terms TEXT DEFAULT 'net30',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contractor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contractor_profiles_select_own" ON public.contractor_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "contractor_profiles_insert_own" ON public.contractor_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "contractor_profiles_update_own" ON public.contractor_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "contractor_profiles_select_all" ON public.contractor_profiles FOR SELECT USING (true);

-- SERVICE REQUESTS
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homeowner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  contractor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  trade_category TEXT NOT NULL,
  address TEXT,
  city TEXT DEFAULT 'Topeka',
  state TEXT DEFAULT 'KS',
  zip TEXT,
  budget_ceiling NUMERIC(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'assigned', 'scheduled', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'emergency')),
  scheduled_date TIMESTAMPTZ,
  completed_date TIMESTAMPTZ,
  notes TEXT,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sr_select_homeowner" ON public.service_requests FOR SELECT USING (auth.uid() = homeowner_id);
CREATE POLICY "sr_select_contractor" ON public.service_requests FOR SELECT USING (auth.uid() = contractor_id);
CREATE POLICY "sr_insert_homeowner" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = homeowner_id);
CREATE POLICY "sr_update_homeowner" ON public.service_requests FOR UPDATE USING (auth.uid() = homeowner_id);
CREATE POLICY "sr_update_contractor" ON public.service_requests FOR UPDATE USING (auth.uid() = contractor_id);

-- SERVICE REQUEST MEDIA
CREATE TABLE IF NOT EXISTS public.service_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video', 'document')),
  file_name TEXT,
  file_size INTEGER,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_select_owner" ON public.service_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = request_id AND (sr.homeowner_id = auth.uid() OR sr.contractor_id = auth.uid()))
);
CREATE POLICY "media_insert_owner" ON public.service_media FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "media_delete_owner" ON public.service_media FOR DELETE USING (auth.uid() = uploaded_by);

-- TIMELINE / STATUS UPDATES
CREATE TABLE IF NOT EXISTS public.request_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.request_timeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "timeline_select" ON public.request_timeline FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = request_id AND (sr.homeowner_id = auth.uid() OR sr.contractor_id = auth.uid()))
);
CREATE POLICY "timeline_insert" ON public.request_timeline FOR INSERT WITH CHECK (auth.uid() = author_id);

-- INVOICES
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES public.service_requests(id) ON DELETE SET NULL,
  contractor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  homeowner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled')),
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5,4) DEFAULT 0.085,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  discount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  due_date DATE,
  paid_date DATE,
  notes TEXT,
  payment_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "invoices_select_contractor" ON public.invoices FOR SELECT USING (auth.uid() = contractor_id);
CREATE POLICY "invoices_select_homeowner" ON public.invoices FOR SELECT USING (auth.uid() = homeowner_id);
CREATE POLICY "invoices_insert_contractor" ON public.invoices FOR INSERT WITH CHECK (auth.uid() = contractor_id);
CREATE POLICY "invoices_update_contractor" ON public.invoices FOR UPDATE USING (auth.uid() = contractor_id);

-- INVOICE LINE ITEMS
CREATE TABLE IF NOT EXISTS public.invoice_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(10,2) DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "line_items_select" ON public.invoice_line_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invoices inv WHERE inv.id = invoice_id AND (inv.contractor_id = auth.uid() OR inv.homeowner_id = auth.uid()))
);
CREATE POLICY "line_items_insert" ON public.invoice_line_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.invoices inv WHERE inv.id = invoice_id AND inv.contractor_id = auth.uid())
);
CREATE POLICY "line_items_update" ON public.invoice_line_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.invoices inv WHERE inv.id = invoice_id AND inv.contractor_id = auth.uid())
);
CREATE POLICY "line_items_delete" ON public.invoice_line_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.invoices inv WHERE inv.id = invoice_id AND inv.contractor_id = auth.uid())
);

-- SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homeowner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'homeowner' CHECK (plan IN ('homeowner', 'homeowner_plus', 'homeowner_pro')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  billing_interval TEXT DEFAULT 'monthly' CHECK (billing_interval IN ('monthly', 'annual')),
  amount NUMERIC(10,2) NOT NULL,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subs_select_own" ON public.subscriptions FOR SELECT USING (auth.uid() = homeowner_id);
CREATE POLICY "subs_insert_own" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = homeowner_id);
CREATE POLICY "subs_update_own" ON public.subscriptions FOR UPDATE USING (auth.uid() = homeowner_id);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'request', 'invoice', 'payment')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifs_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifs_insert_own" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notifs_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "msgs_select" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = request_id AND (sr.homeowner_id = auth.uid() OR sr.contractor_id = auth.uid()))
);
CREATE POLICY "msgs_insert" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
