import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import BouncingLoader from '../utils/BouncingLoader';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          props.isRendering ? (
            <BouncingLoader />
          ) : (
            <Component
              //Прокидываем все пропсы в нашем случае это только пропсы Main, но компонент должен быть универсален, потому такая запись
              {...props}
            />
          )
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    </Route>
  );
}

export default ProtectedRoute;
