-- ==========================================
-- EXTENSIONS
-- ==========================================
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==========================================
-- ROLE ENUM
-- ==========================================
do $$ begin
  create type public.user_role as enum ('admin', 'student');
exception
  when duplicate_object then null;
end $$;

-- ==========================================
-- PROFILES TABLE
-- ==========================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'student',
  roll_number text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==========================================
-- INDEXES
-- ==========================================
create index if not exists idx_profiles_role on public.profiles(role);

create unique index if not exists one_admin_only
on public.profiles ((role))
where role = 'admin';

-- ==========================================
-- HELPER FUNCTION
-- ==========================================
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$;

-- ==========================================
-- UPDATED_AT TRIGGER
-- ==========================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at on public.profiles;

create trigger trg_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

-- ==========================================
-- SIGNUP TRIGGER
-- ==========================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.profiles where role = 'admin'
  ) then
    insert into public.profiles (id, full_name, role)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name',''),
      'admin'
    );
  else
    insert into public.profiles (id, full_name, role)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name',''),
      'student'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ==========================================
-- RLS ENABLE
-- ==========================================
alter table public.profiles enable row level security;

-- ==========================================
-- USER POLICIES
-- ==========================================
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

-- ==========================================
-- ADMIN POLICIES
-- ==========================================
create policy "Admins can view all profiles"
on public.profiles
for select
using (public.is_admin());

create policy "Admins can update all profiles"
on public.profiles
for update
using (public.is_admin());

create policy "Admins can delete profiles"
on public.profiles
for delete
using (public.is_admin());

