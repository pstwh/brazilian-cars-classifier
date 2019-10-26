import React from "react"

import { BrowserRouter as Router,
         Route,
         Link } from "react-router-dom"

import Home from "./pages/home"

const App = () => (
  <Router>
      {/* Router, poderiam existir mais páginas */}
      <Route exact path="/" component={Home} />
  </Router>
);

export default App;
