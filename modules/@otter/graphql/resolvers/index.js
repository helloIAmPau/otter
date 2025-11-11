import { lastTimestamp, appendData, heartRate, seriesByDay } from './meta';
import { currentWeight } from './weight';
import DateTime from './datetime';
import JSON from './json';

export default {
  DateTime,
  JSON,
  Query: {
    currentWeight,
    lastTimestamp,
    heartRate,
    seriesByDay
  },
  Mutation: {
    appendData
  }
};
