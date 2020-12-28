import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {
  render() {
    return (
        <header>
          <h1>Investing app</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">Stocks</Link>
            </li>
            <li>
              <Link to="/crypto">Crypto</Link>
            </li>
          </ul>
          <hr></hr>
        </header>
    );
  }
}
 
export default Header;