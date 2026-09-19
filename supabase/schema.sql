create extension if not exists pgcrypto;

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  project_name text not null,
  project_type text not null default 'Website',
  images jsonb not null default '[]'::jsonb,
  videos jsonb not null default '[]'::jsonb,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_created_at_idx
  on public.portfolio_projects (created_at desc);

alter table public.admins enable row level security;
alter table public.portfolio_projects enable row level security;

insert into storage.buckets (id, name, public)
values ('kibo-portfolio', 'kibo-portfolio', true)
on conflict (id) do update set public = true;

create or replace function public.set_portfolio_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_projects_updated_at on public.portfolio_projects;
create trigger portfolio_projects_updated_at
before update on public.portfolio_projects
for each row execute function public.set_portfolio_updated_at();

insert into public.admins (email, password_hash)
values ('admin@example.com', '$2b$12$WNqSd9Yl53S3uDlqOqCTjOgMGyt5.yEDkxeP89ANfHg0Hob7BooHi')
on conflict (email) do update
set password_hash = excluded.password_hash;
