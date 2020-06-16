import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ListContracts from '../pages/ListContracts';
import ListClients from '../pages/ListClients';
import ListMaterials from '../pages/ListMaterials';
import CreateClient from '../pages/CreateClient';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/contracts" component={ListContracts} isPrivate />
      <Route path="/clients" exact component={ListClients} isPrivate />
      <Route path="/materials" component={ListMaterials} isPrivate />

      <Route path="/clients/register" component={CreateClient} isPrivate />
    </Switch>
  );
};

export default Routes;
