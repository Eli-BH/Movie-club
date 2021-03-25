import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./Pages/HomePage";
import "./scss/App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviePage from "./Pages/MoviePage";
import UserPage from "./Pages/UserPage";
import ActorPage from "./Pages/ActorPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import Auth from "./Pages/Auth";
import ExitingAuthPage from "./Pages/ExitingAuthPage";
import NoUserPage from "./Pages/NoUserPage";

const App = () => {
  const profile = localStorage.getItem("profile");
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/actor/:id" component={ActorPage} />
        <Route path="/search/:query" component={SearchResultsPage} />
        <Route path="/user/:id" component={profile ? UserPage : NoUserPage} />
        <Route
          path="/auth"
          exact
          component={profile ? ExitingAuthPage : Auth}
        />
      </Switch>
    </Router>
  );
};

export default App;
