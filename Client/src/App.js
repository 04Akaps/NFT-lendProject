import "./App.css";
import { Route, Switch } from "react-router-dom";

import { LoginPage, TransactionPage } from "./components/main";
import Home from "./Home";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <LoginPage />
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
