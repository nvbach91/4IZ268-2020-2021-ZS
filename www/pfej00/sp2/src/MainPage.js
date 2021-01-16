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
import Cryptos from "./Components/Cryptos";
 
class MainPage extends Component {
  render() {
    const year = new Date().getFullYear(); //Aktuální rok pro Copyright :)
    return (
        <Router>
          <Header/>
          <main className="container">
            <section id="content">
              <br></br>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/stocks">
                  <Stocks />
                </Route>
                <Route path="/crypto">
                  <Cryptos />
                </Route>
              </Switch>
            </section>
          </main>
          <footer>
            <small>&copy; Copyright {year}, Jan Pfeiffer</small>
          </footer>
        </Router>
    );
  }
}
 
export default MainPage;