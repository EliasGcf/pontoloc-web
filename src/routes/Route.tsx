import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import DefaultLayout from '../pages/_layouts/default';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  const Layout = DefaultLayout;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (user && isPrivate) {
          return (
            <Layout>
              <Component />
            </Layout>
          );
        }

        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/contracts',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
