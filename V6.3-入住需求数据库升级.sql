-- ZIEC HOTEL V6.3 入住需求表升级
-- 在 Supabase SQL Editor 中完整执行一次。

create extension if not exists pgcrypto;

create table if not exists public.booking_orders (
  id uuid primary key default gen_random_uuid(),
  order_no varchar(40) not null,
  customer_name varchar(80) not null,
  contact varchar(40) not null,
  hotel_name varchar(120) default '中鼎国际酒店',
  room_type varchar(80) default '',
  checkin varchar(30) default '',
  checkout varchar(30) default '',
  rooms varchar(30) default '',
  guests varchar(30) default '',
  price numeric(12,2) default 0,
  currency varchar(10) default 'USD',
  note text default '',
  status varchar(20) not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.booking_orders add column if not exists order_no varchar(40);
alter table public.booking_orders add column if not exists customer_name varchar(80);
alter table public.booking_orders add column if not exists contact varchar(40);
alter table public.booking_orders add column if not exists hotel_name varchar(120) default '中鼎国际酒店';
alter table public.booking_orders add column if not exists room_type varchar(80) default '';
alter table public.booking_orders add column if not exists checkin varchar(30) default '';
alter table public.booking_orders add column if not exists checkout varchar(30) default '';
alter table public.booking_orders add column if not exists rooms varchar(30) default '';
alter table public.booking_orders add column if not exists guests varchar(30) default '';
alter table public.booking_orders add column if not exists price numeric(12,2) default 0;
alter table public.booking_orders add column if not exists currency varchar(10) default 'USD';
alter table public.booking_orders add column if not exists note text default '';
alter table public.booking_orders add column if not exists status varchar(20) default 'new';
alter table public.booking_orders add column if not exists created_at timestamptz default now();

alter table public.booking_orders enable row level security;

-- Vercel API 使用 Service Role 写入，前台访客不能直接读取客户资料。
revoke all on table public.booking_orders from anon, authenticated;

notify pgrst, 'reload schema';

select 'V6.3 booking_orders ready' as result;
