import { useMemo, useState, useLayoutEffect } from 'react';

import { defineTask, isTaskRegisteredAsync } from 'expo-task-manager';
import { unregisterTaskAsync, registerTaskAsync, BackgroundTaskResult } from 'expo-background-task';

const TASK_NAME = 'OTTER_DATA_SYNC';

defineTask(TASK_NAME, function() {
  return BackgroundTaskResult.Success;
});

export default function useSync() {
  const [ state, setState ] = useState('LOADING');

  useLayoutEffect(function() {
    if(state === 'LOADING') {
      isTaskRegisteredAsync(TASK_NAME).then(function(isRegistered) {
        if(isRegistered === true) {
          setState('REGISTERED');

          return;
        }


        setState('UNREGISTERED');
      });

      return;
    }

    if(state === 'REGISTERED') {
      return;
    }

    registerTaskAsync(TASK_NAME).then(function() {
      setState('LOADING');
    });
  }, [ state ]);

  return useMemo(function() {
    return {
      state,
      unregister: function() {
        unregisterTaskAsync(TASK_NAME).then(function() {
          setState('LOADING');
        });
      }
    };
  }, [ state ]);
};
