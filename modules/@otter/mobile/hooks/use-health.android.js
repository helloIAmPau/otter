import { useState, useMemo, useCallback } from 'react';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';
import { useGraphql } from '@otter/graphql/client';

export const useHealth = function() {
  const [ isLoading, setIsLoading ] = useState(false);

  const [ lastTimestampQuery ] = useGraphql(`
query($series: String!) {
  lastTimestamp(series: $series)
}
  `);

  const [ appendDataMutation ] = useGraphql(`
mutation($data: [HealthRecordInput]!) {
  appendData(data: $data)
}
  `);

  const sync = useCallback(function() {
    setIsLoading(true);

    return initialize().then(function(isInitialized) {
      if(isInitialized === false) {
        throw new Error('Unable to initialize android health framework');
      }

      return requestPermission([
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
        { accessType: 'read', recordType: 'BodyFat' },
        { accessType: 'read', recordType: 'ExerciseSession' },
        { accessType: 'read', recordType: 'BackgroundAccessPermission' },
        { accessType: 'read', recordType: 'HeartRate' },
        { accessType: 'read', recordType: 'Height' },
        { accessType: 'read', recordType: 'Nutrition' },
        { accessType: 'read', recordType: 'RestingHeartRate' },
        { accessType: 'read', recordType: 'SleepSession' },
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
        { accessType: 'read', recordType: 'Vo2Max' },
        { accessType: 'read', recordType: 'Weight' }
      ]);
    }).then(function(permissions) {
      return permissions.filter(function({ recordType }) {
        if(recordType === 'BackgroundAccessPermission') {
          return false;
        }

        return true;
      });
    }).then(function(series) {
      return series.map(function({ recordType }) {
        return lastTimestampQuery({ series: recordType }).then(function({ lastTimestamp }) {
          return { series: recordType, startTime: lastTimestamp };
        });
      });
    }).then(function(promises) {
      return Promise.all(promises);
    }).then(function(seriesInfo) {
      return seriesInfo.map(function({ series, startTime }) {
        return readRecords(series, {
          timeRangeFilter: {
            operator: 'after',
            startTime
          }
        }).then(function({ records }) {
          return records.map(function({ time, endTime, startTime, metadata, ...value }) {
            return {
              name: series,
              startDateTime: startTime || time,
              endDateTime: endTime || time,
              metadata: JSON.stringify(metadata),
              value: JSON.stringify(value)
            }
          });
        });
      });
    }).then(function(promises) {
      return Promise.all(promises);
    }).then(function(series) {
      return series.map(function(data) {
        if(data.length === 0) {
          return {
            appendData: true
          };
        }

        return appendDataMutation({ data });
      });
    }).then(function(promises) {
      return Promise.all(promises);
    }).finally(function() {
      setIsLoading(false);
    });
  }, [ lastTimestampQuery, appendDataMutation ]);

  return useMemo(function() {
    return {
      isLoading,
      sync
    }
  }, [ isLoading, sync ]);
};
