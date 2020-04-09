import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (
  <div>Loading</div>
);

export const AsyncHomeView = Loadable({
  loader: () => import('./Home'),
  loading: () => <Loading />,
});

export const AsyncCalendarView = Loadable({
  loader: () => import('./Calendar'),
  loading: () => <Loading />,
});

export const AsyncLoginView = Loadable({
  loader: () => import('./Login'),
  loading: () => <Loading />,
});

export const AsyncScheduleView = Loadable({
  loader: () => import('./Schedule'),
  loading: () => <Loading />,
});
