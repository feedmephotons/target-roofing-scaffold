-- Operations suite: team, tasks, meeting intelligence, podcast production, telegram
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  email text,
  phone text,
  aliases text[] not null default '{}',
  telegram_user_id bigint unique,
  telegram_username text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  occurred_at timestamptz,
  source text not null default 'paste',        -- paste | upload | api | telegram | email
  status text not null default 'new',          -- new | transcribing | parsing | parsed | error
  transcript text,
  media_path text,                             -- storage path in bucket 'meetings'
  media_mime text,
  summary text,
  decisions jsonb not null default '[]',
  participants jsonb not null default '[]',
  error text,
  created_by text,
  created_at timestamptz not null default now(),
  parsed_at timestamptz
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  assignee_id uuid references team_members(id) on delete set null,
  status text not null default 'todo',         -- todo | in_progress | done
  priority text not null default 'normal',     -- low | normal | high
  due_date date,
  tags text[] not null default '{}',
  source text not null default 'manual',       -- manual | meeting | telegram | voice | api
  meeting_id uuid references meetings(id) on delete set null,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists tasks_assignee_idx on tasks(assignee_id, status);

create table if not exists meeting_task_suggestions (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references meetings(id) on delete cascade,
  title text not null,
  description text,
  owner_name_raw text,
  suggested_member_id uuid references team_members(id) on delete set null,
  match_confidence numeric,
  due_hint text,
  due_date date,
  priority text not null default 'normal',
  tags text[] not null default '{}',
  evidence text,
  status text not null default 'pending',      -- pending | accepted | dismissed
  task_id uuid references tasks(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists podcast_name_votes (
  id uuid primary key default gen_random_uuid(),
  option_slug text not null,
  voter_id uuid not null references team_members(id) on delete cascade,
  vote text not null,                          -- love | maybe | no
  note text,
  updated_at timestamptz not null default now(),
  unique (option_slug, voter_id)
);

create table if not exists podcast_settings (
  id int primary key default 1 check (id = 1),
  show_name text,
  chosen_option_slug text,
  description text,
  author text default 'Target Roofing',
  owner_email text default 'casey@targetroofers.com',
  category text default 'Business',
  subcategory text default 'Entrepreneurship',
  cover_url text,
  explicit boolean default true,
  language text default 'en-us',
  apple_url text,
  spotify_url text,
  youtube_url text,
  updated_at timestamptz not null default now()
);
insert into podcast_settings (id) values (1) on conflict do nothing;

create table if not exists podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  number int,
  title text not null,
  status text not null default 'planning',     -- planning | recorded | editing | ready | published
  record_date timestamptz,
  plan text,                                   -- run of show (markdown)
  description text,
  show_notes text,
  chapters jsonb not null default '[]',
  clip_ideas jsonb not null default '[]',
  title_options jsonb not null default '[]',
  transcript text,
  audio_path text,                             -- storage path in bucket 'podcast'
  audio_url text,
  audio_bytes bigint,
  audio_mime text,
  duration_s int,
  video_url text,
  cover_url text,
  youtube_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists telegram_chats (
  chat_id bigint primary key,
  title text,
  type text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists assistant_log (
  id bigserial primary key,
  channel text not null,                       -- telegram | voice | admin
  actor text,
  action text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- Lock everything down: only the service role (server code) touches these.
alter table team_members enable row level security;
alter table meetings enable row level security;
alter table tasks enable row level security;
alter table meeting_task_suggestions enable row level security;
alter table podcast_name_votes enable row level security;
alter table podcast_settings enable row level security;
alter table podcast_episodes enable row level security;
alter table telegram_chats enable row level security;
alter table assistant_log enable row level security;

insert into storage.buckets (id, name, public, file_size_limit)
values ('meetings', 'meetings', false, 524288000), ('podcast', 'podcast', true, 524288000)
on conflict (id) do nothing;

insert into team_members (name, role, email, aliases)
select * from (values
  ('Casey Crowther', 'President, Target Roofing', 'casey@targetroofers.com', array['Casey','Crowther']),
  ('Darian', 'AI Lead, Target Roofing', null, array['Darian','Darren','Dan','Derek','Tondarian','Dondarian']),
  ('Winston Fowlkes', 'AI Developer (Winston Fowlkes CDM)', 'winston@winstonf.com', array['Winston','Winston Folks','Willie'])
) v(name, role, email, aliases)
where not exists (select 1 from team_members);
