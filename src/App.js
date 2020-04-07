import React from "react";
import { Route } from "react-router";
import Calendar from './Calendar';
import Home from './Home';
import Login from './Login';
import Schedule from './Schedule';

const App = () => (
  <div>
    <h1>This is my App!</h1>
    <Route path="/" component={Home} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/calendar" component={Calendar} exact />
    <Route path="/schedule" component={Schedule} exact />
  </div>
);

export default App;
