-- ZIEC HOTEL V6.5
-- 修复：42501 permission denied for table booking_orders
-- 在 Supabase Dashboard > SQL Editor 中完整执行。

begin;

alter table public.booking_orders enable row level security;

-- 网站订单必须通过 Vercel 服务端写入，不向浏览器公开数据库写权限。
revoke all on table public.booking_orders from anon, authenticated;
grant select, insert, update, delete on table public.booking_orders to service_role;

-- 兼容 id 使用 identity / serial sequence 的项目。
grant usage, select on all sequences in schema public to service_role;

commit;

notify pgrst, 'reload schema';

select
  grantee,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'booking_orders'
  and grantee = 'service_role'
order by privilege_type;
