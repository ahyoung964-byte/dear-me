create extension if not exists "uuid-ossp";

create table if not exists dm_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  quiz_answers jsonb not null default '{}',
  manual jsonb not null default '{}',
  loading jsonb not null default '{}',
  npc jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists dm_daily_updates (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references dm_profiles(id),
  mood text not null,
  keywords text[] not null default '{}',
  loading_patch jsonb not null default '{}',
  created_at timestamptz default now()
);

create table if not exists dm_snapshots (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references dm_profiles(id),
  label text not null,
  manual jsonb not null default '{}',
  loading jsonb not null default '{}',
  npc jsonb not null default '{}',
  created_at timestamptz default now()
);

alter table dm_profiles disable row level security;
alter table dm_daily_updates disable row level security;
alter table dm_snapshots disable row level security;
