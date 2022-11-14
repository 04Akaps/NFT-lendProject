import "./App.css";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { LoginPage } from "components/main";
import Home from "./Home";
import { useState } from "react";
import { useEffect } from "react";
//
function App() {
  const [auth, setAuth] = useState(
    JSON.parse(window.localStorage.getItem("connect"))
  );

  useEffect(() => {
    setAuth(JSON.parse(window.localStorage.getItem("connect")));
  }, []);

  return (
    <>
      <Switch>
        {auth ? (
          <Home />
        ) : (
          <Route exact path="/">
            <LoginPage setAuth={setAuth} />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
