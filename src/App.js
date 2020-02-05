import React from "react";
import "./index.min.css";
import MainView from "./components/MainView";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllianceView from "./components/AllianceView";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/strategy" component={MainView} />
          <Route exact path="/alliance" component={AllianceView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
