import { useCallback } from 'react';

import Calendar from '../calendar';

export default function SeriesCalendar({ startDateTime, endDateTime }) {
  const onEvents = useCallback(function() {
    return Promise.resolve({});
  }, []);

  return (
    <Calendar onEvents={ onEvents } />
  );
};
