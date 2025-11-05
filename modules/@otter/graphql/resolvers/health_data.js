import { query, insert } from '@otter/clickhouse';

export const lastTimestamp = function(_, { series }, { user }) {
  return query(`
select
  addMilliseconds(max(startDateTime), 1) as lastTimestamp
from
  health.series
where
  name = {series: String} and owner = {userUid: UUID}
  `, {
    series,
    userUid: user.uid
  }).then(function({ data }) {
    return data[0].lastTimestamp;
  });
};

export const appendData = function(_, { data }, { user }) {
  return insert('health.series', [
    'name',
    'startDateTime',
    'endDateTime',
    'metadata',
    'value',
    'owner'
  ], data.map(function(row) {
    return {
      ...row,
      owner: user.uid
    };
  }));
};

export const heartRate = function(_, { startDateTime, endDateTime }, { user }) {
  return query(`
with series as (
  select
    metadata.dataOrigin as source,
    arrayJoin(value.samples::Array(JSON)) as sample
  from
    health.series
  where
    owner = {userUid: UUID} and name = 'HeartRate' and startDateTime >= {startDateTime: DateTime64} and startDateTime <= {endDateTime: DateTime64}
)

select
  sample.time::DateTime64 as timestamp,
  source::String,
  sample.beatsPerMinute::UInt64 as value
from
  series
order by timestamp;
  `, {
    userUid: user.uid,
    startDateTime,
    endDateTime
  }).then(function({ data }) {
    return data;
  });
};

export const seriesByDay = function(_, { startDateTime, endDateTime }, { user }) {
  return query(`
with orderedSeries as (
  select
    name,
    toDate(startDateTime) as day
  from
    health.series
  where
    owner = {userUid: UUID} and startDateTime >= {startDateTime: DateTime64} and startDateTime <= {endDateTime: DateTime64}
  order by day, name
)

select
  groupUniqArray(name) as series,
  day
from
  orderedSeries
group by day;
  `, {
    userUid: user.uid,
    startDateTime,
    endDateTime
  }).then(function({ data }) {
    return data;
  });
};
