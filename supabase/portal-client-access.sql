-- ============================================================
-- Client Portal access — run in Supabase Dashboard > SQL Editor
--
-- Fixes "Access Denied: Your account is not linked to a client"
-- for logged-in portal clients, and lets them read their own
-- tasks, content events, payments, and invoices.
--
-- Safe to run multiple times.
-- ============================================================

-- 1. Normalise existing portal emails (auth emails are stored lowercase,
--    e.g. SVCD@roguestudio.in was saved on the client but the auth user
--    is svcd@roguestudio.in)
update public.clients
set portal_email = lower(portal_email)
where portal_email is not null
  and portal_email <> lower(portal_email);

-- 2. Helper: the client id linked to the currently logged-in user.
--    SECURITY DEFINER so it can read clients regardless of RLS.
create or replace function public.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.clients
  where lower(portal_email) = lower(auth.jwt() ->> 'email')
  limit 1;
$$;

-- 3. Clients can read their own client row
drop policy if exists "portal client reads own client row" on public.clients;
create policy "portal client reads own client row"
on public.clients for select
to authenticated
using (lower(portal_email) = lower(auth.jwt() ->> 'email'));

-- 4. Clients can read their own related records
drop policy if exists "portal client reads own tasks" on public.tasks;
create policy "portal client reads own tasks"
on public.tasks for select
to authenticated
using (client_id = public.current_client_id());

drop policy if exists "portal client reads own content events" on public.content_events;
create policy "portal client reads own content events"
on public.content_events for select
to authenticated
using (client_id = public.current_client_id());

drop policy if exists "portal client reads own payments" on public.payments;
create policy "portal client reads own payments"
on public.payments for select
to authenticated
using (client_id = public.current_client_id());

drop policy if exists "portal client reads own invoices" on public.invoices;
create policy "portal client reads own invoices"
on public.invoices for select
to authenticated
using (client_id = public.current_client_id());

-- ============================================================
-- Diagnostics (optional): run these to inspect current state
-- ============================================================

-- Which policies exist on the portal tables?
-- select tablename, policyname, cmd, roles
-- from pg_policies
-- where tablename in ('clients','tasks','content_events','payments','invoices')
-- order by tablename;

-- Do auth emails match client portal emails?
-- select c.name, c.portal_email, u.email as auth_email
-- from public.clients c
-- left join auth.users u on lower(u.email) = lower(c.portal_email)
-- where c.portal_email is not null;
