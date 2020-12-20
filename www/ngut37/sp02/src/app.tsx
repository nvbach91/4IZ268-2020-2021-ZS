import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components/navbar/navbar';
import { AddForm } from './components/add-form/form';
import { LinksList } from './components/links-list/links-list.';
import { About } from './components/about/about';
import { Footer } from './components/footer/footer';

export const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={AddForm}></Route>
          <Route path="/list" component={LinksList}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
}
