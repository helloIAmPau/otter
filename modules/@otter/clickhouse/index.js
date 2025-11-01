import { createClient } from '@clickhouse/client';

const client = createClient({
  url: 'http://clickhouse:8123',
  password: process.env.CLICKHOUSE_PASSWORD
});

export const query = function(sql, params) {
  return client.query({
    query: sql,
    query_params: params
  }).then(function(result) {
    console.log(`Gathering data for query ${ result.query_id }`);

    return result.json();
  });
};
