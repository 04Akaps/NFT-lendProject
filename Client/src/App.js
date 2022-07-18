import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { LoginPage, TransactionPage } from "components/main";
import Home from "./Home";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [auth, setAuth] = useState(window.localStorage.getItem("auth"));

  useEffect(() => {
    setAuth(window.localStorage.getItem("auth"));
  }, [auth]);

  return (
    <>
      {auth ? "" : <Redirect to="/" />}
      <Switch>
        <Route exact path="/">
          <LoginPage setAuth={setAuth} auth={auth} />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
      </Switch>
      <div className="App"></div>
    </>
  );
}

export default App;
