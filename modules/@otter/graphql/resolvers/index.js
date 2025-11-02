import { lastTimestamp, appendData } from './health_data';
import DateTime from './datetime';
import JSON from './json';

export default {
  DateTime,
  JSON,
  Query: {
    lastTimestamp
  },
  Mutation: {
    appendData
  }
};
