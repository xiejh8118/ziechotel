create extension if not exists pgcrypto;
create table if not exists public.suppliers(id uuid primary key default gen_random_uuid(),company_name varchar(120) not null,category varchar(60) not null,city varchar(60) default '',contact_name varchar(80) not null,phone varchar(40) default '',whatsapp varchar(40) default '',address varchar(180) default '',products text default '',description text default '',status varchar(20) not null default 'pending' check(status in('pending','approved','rejected','paused')),featured boolean not null default false,created_at timestamptz not null default now());
create table if not exists public.purchase_inquiries(id uuid primary key default gen_random_uuid(),customer_name varchar(80) not null,company_name varchar(120) default '',phone varchar(40) default '',whatsapp varchar(40) default '',category varchar(60) not null,budget varchar(80) default '',requirements text not null,delivery_time varchar(100) default '',status varchar(20) not null default 'new',created_at timestamptz not null default now());
alter table public.suppliers enable row level security;alter table public.purchase_inquiries enable row level security;
drop policy if exists "public approved suppliers" on public.suppliers;create policy "public approved suppliers" on public.suppliers for select using(status='approved');
-- V6.0 supplier promotion fields
alter table public.suppliers add column if not exists logo_url text default '';
alter table public.suppliers add column if not exists slogan varchar(120) default '';
alter table public.suppliers add column if not exists image_urls text[] not null default '{}';

create table if not exists public.site_settings(
  setting_key varchar(80) primary key,
  setting_value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('supplier-images','supplier-images',true,2097152,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=2097152,allowed_mime_types=array['image/jpeg','image/png','image/webp'];

drop policy if exists "public supplier images" on storage.objects;
create policy "public supplier images" on storage.objects for select using(bucket_id='supplier-images');
