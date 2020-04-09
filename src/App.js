import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AsyncHomeView, AsyncCalendarView, AsyncLoginView, AsyncScheduleView } from './asyncViews';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AsyncHomeView} />
        <Route path="/calendar" component={AsyncCalendarView} />
        <Route path="/login" component={AsyncLoginView} />
        <Route path="/schedule" component={AsyncScheduleView} />
      </Switch>
    </Router>
  );
}
