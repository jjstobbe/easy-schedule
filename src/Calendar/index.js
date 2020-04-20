import React, { useState } from 'react';
import { useFetch } from '../utils/hooks';
import { Redirect } from 'react-router-dom';
import './index.css';

const Calendar = () => {
  const [calendars, loading] = useFetch('/get-calendars');
  const [redirect, setRedirect] = useState('');

  const onCalendarClick = async (calendar) => {
    const response = await fetch(`/set-primary-calendar?selectedCalendarId=${calendar.id}`,
    {
      method: 'POST',
    });

    if (response.status === 200) {
      setRedirect('schedule');
    }
  }

  if (!loading && !calendars) {
    return <Redirect to='login' />;
  }
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      {loading && <div> Loading </div>}

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
