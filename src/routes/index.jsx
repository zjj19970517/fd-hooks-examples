import { Route, Redirect, Switch } from "react-router-dom";

import routesConfig from "./config";
import RouteWrapper from "./RouteWrapper";

const CRouter = () => {
  const createMenu = (r) => {
    const route = (r) => {
      const Component = r.component;
      return (
        <Route
          key={r.route || r.key}
          exact
          path={r.route || r.key}
          render={(props) => {
            const wrapper = (
              <RouteWrapper {...{ ...props, Comp: Component, route: r }} />
            );
            return wrapper;
          }}
        />
      );
    };

    const subRoute = (r) =>
      r.subs &&
      r.subs.map((subR) => (subR.subs ? subRoute(subR) : route(subR)));

    return r.component ? route(r) : subRoute(r);
  };
  const createRoute = (key) => routesConfig[key].map(createMenu);

  const Routes = Object.keys(routesConfig).map((key) => createRoute(key));
  console.log("Routes", Routes);
  return (
    <Switch>
      <Route path="/app/about">
        <About />
      </Route>
      <Route path="/app/topics">
        <Home />
      </Route>
      <Switch>
        {Routes}
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </Switch>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default CRouter;
