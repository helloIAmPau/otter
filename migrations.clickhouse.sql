create database if not exists health;

create table if not exists health.series (
  name String not null,
  owner UUID not null,
  startDateTime DateTime64(3, 'UTC') not null,
  endDateTime DateTime64(3, 'UTC') not null,
  value JSON not null,
  metadata JSON not null
)
engine = MergeTree()
order by startDateTime
partition by (owner, name, toDate(startDateTime));
