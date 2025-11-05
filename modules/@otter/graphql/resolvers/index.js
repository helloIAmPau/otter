import { lastTimestamp, appendData, heartRate, seriesByDay } from './health_data';
import DateTime from './datetime';
import JSON from './json';

export default {
  DateTime,
  JSON,
  Query: {
    lastTimestamp,
    heartRate,
    seriesByDay
  },
  Mutation: {
    appendData
  }
};
