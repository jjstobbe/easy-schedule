import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Calendar from './Calendar';
import Home from './Home';
import LoginPage from './Login';
import Schedule from './Schedule';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/schedule">Schedule</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
