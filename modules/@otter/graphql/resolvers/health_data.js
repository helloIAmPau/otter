import { query } from '@otter/clickhouse';

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
