import { initialize, requestPermission, readRecords } from 'react-native-health-connect';
import graphql from '@otter/graphql/client';

export default function() {
  return initialize().then(function(isInitialized) {
    if(isInitialized === false) {
      throw new Error('Unable to initialize health framework');
    }

    return requestPermission([
      { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      { accessType: 'read', recordType: 'BodyFat' },
      { accessType: 'read', recordType: 'ExerciseSession' },
//        { accessType: 'read', recordType: 'ExerciseRoute' },
//        { accessType: 'read', recordType: 'HealthDataHistory' },
      { accessType: 'read', recordType: 'BackgroundAccessPermission' },
      { accessType: 'read', recordType: 'HeartRate' },
//        { accessType: 'read', recordType: 'HeartRateVariability' },
      { accessType: 'read', recordType: 'Height' },
      { accessType: 'read', recordType: 'Nutrition' },
      { accessType: 'read', recordType: 'RestingHeartRate' },
      { accessType: 'read', recordType: 'SleepSession' },
      { accessType: 'read', recordType: 'TotalCaloriesBurned' },
      { accessType: 'read', recordType: 'Vo2Max' },
      { accessType: 'read', recordType: 'Weight' }
    ]);
  }).then(function(series) {
    const finalTimestamp = (new Date()).toISOString();

    const uploads = series.filter(function({ recordType }) {
      if(recordType === 'BackgroundAccessPermission')  {
        return false;
      }

      return true;
    }).map(function({ recordType }) {
      return graphql(`
query($series: String!) {
  lastTimestamp(series: $series)
}
      `, {
        series: recordType
      }).then(function({ lastTimestamp }) {
        return readRecords(recordType, {
          timeRangeFilter: {
            operator: 'after',
            startTime: lastTimestamp
          }
        });
      }).then(function({ records }) {
        return records.map(function(row) {
          const { time, endTime, metadata, startTime, ...value } = row;

          return {
            name: recordType,
            startDateTime: startTime || time,
            endDateTime: endTime || time,
            metadata: JSON.stringify(metadata),
            value: JSON.stringify(value)
          };
        });
      }).then(function(data) {
        if(data.length === 0) {
          return { appendData: true };
        }

        return graphql(`
mutation($data: [HealthRecordInput]!) {
  appendData(data: $data)
}
        `, {
          data
        });
      });
    });

    return Promise.all(uploads);
  });
};
