import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
