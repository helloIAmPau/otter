export default function CalendarDay({ day, isToday, events }) {
  if(day == null) {
    return (
      <div>
      </div>
    );
  }

  if(isToday === true) {
    console.log(isToday);
  }
  console.log(events);

  return (
    <div>
      { day.getDate() }
    </div>
  );
};
