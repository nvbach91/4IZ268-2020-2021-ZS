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
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="element">
            <Link className="navbar-brand" to="/">Investing app</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/stocks">Stocks</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crypto">Crypto</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
    );
  }
}
 
export default Header;