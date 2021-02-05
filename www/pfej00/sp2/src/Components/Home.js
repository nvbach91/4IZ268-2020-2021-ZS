import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <section>
        <h2>Home</h2>
        <p>This application is used to observe stock prices and cryptocurrencies. When selected, the investment is saved in the browser so you don't lose it. 
          After searching and loading the graph, please wait a minute before switching between windows, otherwise the data will not be loaded.</p>
      </section>
    );
  }
}
 
export default Home;