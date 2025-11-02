import { createClient } from '@clickhouse/client';

const client = createClient({
  clickhouse_settings: {
    date_time_input_format: 'best_effort',
    date_time_output_format: 'iso'
  },
  url: 'http://clickhouse:8123',
  password: process.env.CLICKHOUSE_PASSWORD
});

export const query = function(sql, params) {
  return client.query({
    query: sql,
    query_params: params
  }).then(function(result) {
    return result.json();
  });
};

export const insert = function(table, columns, values) {
  return client.insert({
    table,
    values,
    columns,
    format: 'JSONEachRow'
  }).then(function({ executed }) {
    return executed;
  });
};
