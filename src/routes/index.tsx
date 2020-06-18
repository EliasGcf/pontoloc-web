import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';

import ListContracts from '../pages/Contracts/ListContracts';

import ListClients from '../pages/Clients/ListClients';
import CreateClient from '../pages/Clients/CreateClient';

import ListMaterials from '../pages/Materials/ListMaterials';

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
