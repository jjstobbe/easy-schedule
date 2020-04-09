import React from 'react';
import { useFetch } from '../utils/hooks';
import { Redirect } from 'react-router-dom';
import './index.css';

const Calendar = () => {
  const [calendars, loading] = useFetch('/get-calendars');

  console.log({ calendars, loading });

  return (
    <div>
      {loading && <div> Loading </div>}

      {/* Feels a bit stupid to do redirects like this, but a better solution isn't coming to mind right now */}
      {!loading && !calendars && <Redirect to='login' />}

      {!loading && calendars && (
        <div className="calendars-container">
          <h2>Select Primary Calendar</h2>
          {calendars.items.map((calendar) => (
            <div>
              {calendar.summary}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
