import React from 'react';
import { useFetch } from '../utils/hooks';
import { Redirect } from 'react-router-dom';
import './index.css';

const Calendar = () => {
  const [calendars, loading] = useFetch('/get-calendars');

  const onCalendarClick = (calendar) => {
    console.log({ selectedCalendar: calendar });
    fetch(`/set-primary-calendar?selectedCalendar=${calendar.id}`,
    {
      method: 'POST',
    });
  }

  console.log({ calendars, loading });

  return (
    <div>
      {loading && <div> Loading </div>}

      {/* Feels a bit stupid to do redirects like this, but a better solution isn't coming to mind right now */}
      {!loading && !calendars && <Redirect to='login' />}

      {!loading && calendars && (
        <div className="calendar-form-container">
          <h2>Select Primary Calendar</h2>

          <div className="calendars-container">
            {calendars.items.map((calendar) => (
              <div
                className="calendar"
                style={{ backgroundColor: calendar.backgroundColor, color: calendar.foregroundColor }}
                key={calendar.id}
                onClick={() => onCalendarClick(calendar)}
              >
                {calendar.summary}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
