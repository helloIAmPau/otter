import { query, insert } from '@otter/clickhouse';

export const lastTimestamp = function(_, { series }, { user }) {
  return query(`
select
  max(startDateTime) as lastTimestamp
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
    row.owner = user.uid;

    return row;
  }));
}
