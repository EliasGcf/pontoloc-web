import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ListContracts from '../pages/Contracts/ListContracts';
import CreateContract from '../pages/Contracts/CreateContract';
import DetailsContract from '../pages/Contracts/DetailsContract';
import ListClients from '../pages/Clients/ListClients';
import CreateClient from '../pages/Clients/CreateClient';
import EditClient from '../pages/Clients/EditClient';
import ListMaterials from '../pages/Materials/ListMaterials';
import CreateMaterial from '../pages/Materials/CreateMaterial';
import EditMaterial from '../pages/Materials/EditMaterial';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/contracts" exact component={ListContracts} isPrivate />
      <Route path="/contracts/register" component={CreateContract} isPrivate />
      <Route
        path="/contracts/details/:id"
        component={DetailsContract}
        isPrivate
      />

      <Route path="/clients" exact component={ListClients} isPrivate />
      <Route path="/clients/register" component={CreateClient} isPrivate />
      <Route path="/clients/edit/:id" component={EditClient} isPrivate />

      <Route path="/materials" exact component={ListMaterials} isPrivate />
      <Route path="/materials/register" component={CreateMaterial} isPrivate />
      <Route path="/materials/edit/:id" component={EditMaterial} isPrivate />
    </Switch>
  );
};

export default Routes;
