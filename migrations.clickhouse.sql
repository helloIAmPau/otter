create database if not exists health;

create table if not exists health.series (
  name String not null,
  owner UUID not null,
  startDateTime DateTime not null,
  endDateTime DateTime not null,
  value JSON not null,
  metadata JSON not null
)
engine = MergeTree()
order by startDateTime
partition by startDateTime;
