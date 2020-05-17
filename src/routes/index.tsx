import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ListContracts from '../pages/ListContracts';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/contracts" component={ListContracts} isPrivate />
    </Switch>
  );
};

export default Routes;
