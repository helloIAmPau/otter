import { query } from '@otter/clickhouse';

export const currentWeight = function(_, variables, { user }) {
  return query(`
select
  value.weight.inKilograms as value,
  startDateTime as timestamp,
  metadata.dataOrigin as source
from
  health.series
where name = 'Weight' and owner = {userUid: UUID}
order by startDateTime desc
limit 1
  `, {
    userUid: user.uid
  }).then(function({ data }) {
    return data[0]
  });

};
