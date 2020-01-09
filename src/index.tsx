import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "./components/content/content";


ReactDOM.render(
  <Router>
    {/* TODO Navbar */}
    <Route exact path="/" component={Home} />
  </Router>,
  document.getElementById("root")
);


