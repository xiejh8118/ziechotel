-- ZIEC HOTEL V6.4：订单转化、客户线索、三语与视频设置
-- 在当前线上 Supabase 项目的 SQL Editor 中完整执行一次。

create extension if not exists pgcrypto;

create table if not exists public.booking_orders (
  id uuid primary key default gen_random_uuid(),
  order_no varchar(40) not null,
  customer_name varchar(80) not null,
  contact varchar(40) not null,
  hotel_name varchar(120) default '中鼎国际酒店',
  room_type varchar(80) default '', checkin varchar(30) default '', checkout varchar(30) default '',
  rooms varchar(30) default '', guests varchar(30) default '', price numeric(12,2) default 0,
  currency varchar(10) default 'USD', note text default '', status varchar(30) default 'pending_contact',
  created_at timestamptz default now(), updated_at timestamptz default now()
);

alter table public.booking_orders add column if not exists country_region varchar(80) default '';
alter table public.booking_orders add column if not exists wechat varchar(100) default '';
alter table public.booking_orders add column if not exists telegram varchar(160) default '';
alter table public.booking_orders add column if not exists messenger varchar(200) default '';
alter table public.booking_orders add column if not exists whatsapp varchar(40) default '';
alter table public.booking_orders add column if not exists transfer_need varchar(120) default '';
alter table public.booking_orders add column if not exists stay_purpose varchar(80) default '';
alter table public.booking_orders add column if not exists source varchar(200) default 'website';
alter table public.booking_orders add column if not exists follow_up_note text default '';
alter table public.booking_orders add column if not exists updated_at timestamptz default now();
alter table public.booking_orders alter column status set default 'pending_contact';
update public.booking_orders set status='pending_contact' where status='new';
alter table public.booking_orders enable row level security;
revoke all on table public.booking_orders from anon, authenticated;

create table if not exists public.site_settings(
  setting_key varchar(80) primary key,
  setting_value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
revoke all on table public.site_settings from anon, authenticated;

create index if not exists booking_orders_created_at_idx on public.booking_orders(created_at desc);
create index if not exists booking_orders_status_idx on public.booking_orders(status);
notify pgrst, 'reload schema';
select 'ZIEC HOTEL V6.4 database ready' as result;
