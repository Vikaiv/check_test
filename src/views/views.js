import React from 'react';

//models
import { Route } from 'mobx-router';

//components
import Tests from '../components/Tests';
import DisciplineList from '../components/DisciplineList';

const views = {
  home: new Route({
    path: '/',
    component: <DisciplineList/>
  }),
  tests: new Route({
    path: '/tests',
    component: <Tests/>,
  }),
};
export default views;