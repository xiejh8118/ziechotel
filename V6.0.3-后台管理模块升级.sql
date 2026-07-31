-- ZIEC HOTEL V6.0.3 后台管理模块升级
-- 在 Supabase SQL Editor 中完整执行一次；不会删除供应商或询价数据。

create extension if not exists pgcrypto;

create table if not exists public.hotels(
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  room_type varchar(80) not null,
  price numeric(12,2) not null default 0,
  price_unit varchar(30) not null default '晚',
  rooms_available integer not null default 0 check(rooms_available >= 0),
  description text default '',
  facilities text[] not null default '{}',
  image_urls text[] not null default '{}',
  status varchar(20) not null default 'draft' check(status in('draft','published','paused')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.hotels enable row level security;
drop policy if exists "public published hotels" on public.hotels;
create policy "public published hotels" on public.hotels for select using(status='published');

grant all privileges on table public.hotels to service_role;
grant select on table public.hotels to anon, authenticated;
grant all privileges on table public.suppliers to service_role;
grant all privileges on table public.purchase_inquiries to service_role;
grant all privileges on table public.site_settings to service_role;

select pg_notify('pgrst', 'reload schema');

select
  case when to_regclass('public.hotels') is not null then 'PASS' else 'FAIL' end as final_result,
  count(*) as hotels_column_count
from information_schema.columns
where table_schema='public' and table_name='hotels';
