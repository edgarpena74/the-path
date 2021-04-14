import React from "react";
import { Route } from "react-router-dom";

const ContextRoute = ({ contextComponent, component, ...rest }) => {
  const { Provider } = contextComponent;
  const Component = component;

  return (
    // Used ...rest to avoid issues that using ...props would bring up
    <Route {...rest}>
      <Provider>
        <Component />
      </Provider>
    </Route>
  );
};

export default ContextRoute;
