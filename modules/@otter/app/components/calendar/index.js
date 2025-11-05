import { useState, useMemo, useLayoutEffect } from 'react';

import { toMonthBegin, toDayBegin, toMonthEnd, add } from '@otter/dates';

import CalendarDay from '../calendar-day';

import { grid } from './styles.module.css';

export default function Calendar({ onEvents, initialDate = new Date() }) {
  const [ currentDate, setCurrentDate ] = useState(toDayBegin(initialDate));
  const [ events, setEvents ] = useState({});

  useLayoutEffect(function() {
    onEvents({
      startDateTime: toMonthBegin(currentDate),
      endDateTime: toMonthEnd(currentDate)
    }).then(function(events) {
      setEvents(events);
    });
  }, [ onEvents, currentDate ]);

  const { days } = useMemo(function() {
    const monthBegin = toMonthBegin(currentDate);
    const monthEnd = toMonthEnd(currentDate);

    return Array.from({ length: 36 }).reduce(function(main, _, index) {
      const day = add(monthBegin, main.dayIndex, 'days');

      if(index < day.getDay() || day.getMonth() !== currentDate.getMonth()) {
        main.days.push(<CalendarDay key={ index } />);

        return main;
      }

      main.days.push(<CalendarDay isToday={ day.toDateString() === currentDate.toDateString() } day={ day } key={ index } />);
      main.dayIndex = main.dayIndex + 1;

      return main;
    }, { dayIndex: 0, days: [] });
  }, [ currentDate, events ]);

  return (
    <div>
      <div>
        { currentDate.getMonth() }
      </div>
      <div className={ grid }>
        { days }
      </div>
    </div>
  );
};
