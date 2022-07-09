import "./App.css";
import { Route, Switch } from "react-router-dom";

import { AuthPage, LoginPage, TransactionPage } from "./components/main";
import Home from "./Home";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/AuthPage">
          <AuthPage setAuth={setAuth} />
        </Route>
        <Route path="/Auth">
          <Home />
        </Route>
        <Route path="/TransationPage">
          <TransactionPage />
        </Route>
      </Switch>
      <div className="App"></div>
    </>
  );
}

export default App;
