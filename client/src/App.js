import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./Pages/HomePage";
import "./scss/App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviePage from "./Pages/MoviePage";
import ActorPage from "./Pages/ActorPage";
import SearchResultsPage from "./Pages/SearchResultsPage";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/actor/:id" component={ActorPage} />
        <Route path="/search/:query" component={SearchResultsPage} />
      </Switch>
    </Router>
  );
};

export default App;
