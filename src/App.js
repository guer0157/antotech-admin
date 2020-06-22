import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/home/Home.js";
import Nav from "./shared/nav/Nav";
import GuiaDetails from "./shared/guia-details/GuiaDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/detalles/:id" component={GuiaDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
