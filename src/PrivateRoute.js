import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ user, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
