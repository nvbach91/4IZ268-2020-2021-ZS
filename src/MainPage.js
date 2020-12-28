import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Stocks from "./Components/Stocks";
import Crypto from "./Components/Crypto";
 
class MainPage extends Component {
  render() {
    return (
        <Router>
          <Header/>
        
          <section id="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/stocks">
                <Stocks />
              </Route>
              <Route path="/crypto">
                <Crypto />
              </Route>
            </Switch>
          </section>
          
          <footer>
            <p>&copy; 2020 Jan Pfeiffer</p>
          </footer>
        </Router>
    );
  }
}
 
export default MainPage;