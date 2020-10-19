import React, { Component } from "react";
import "../assets/css/App.css";
import Header from "./Header";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import ContactListScreen from "../views/contacts/ContactListScreen";
import ContactScreen from "../views/contacts/ContactScreen";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App" className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <ContactListScreen />
            </Route>
            <Route path="/contactForm/:id?" component={ContactScreen} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
