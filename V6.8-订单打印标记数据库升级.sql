begin;

alter table public.booking_orders
  add column if not exists printed_at timestamptz,
  add column if not exists print_count integer not null default 0;

comment on column public.booking_orders.printed_at is '最近一次打印或导出PDF时间';
comment on column public.booking_orders.print_count is '后台打印或导出PDF次数';

grant select, insert, update, delete on table public.booking_orders to service_role;

commit;
notify pgrst, 'reload schema';
