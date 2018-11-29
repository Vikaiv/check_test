import React from 'react';

//models
import { Route } from 'mobx-router';

//components
import DisciplineList from '../components/DisciplineList';
import TestList from '../components/TestList';
import ResultsPage from '../components/ResultsPage';

const views = {
  home: new Route({
    path: '/',
    component: <DisciplineList/>
  }),
  tests: new Route({
    path: '/tests',
    component: <TestList/>,
  }),
  results: new Route({
    path: '/results',
    component: <ResultsPage />,
  }),
};
export default views;