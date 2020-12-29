import React, { Component } from "react";

const inputParsers = {
  uppercase(input) {
    return input.toUpperCase();
  },
};

class Stocks extends Component {
  constructor(props) {
    super(props);

    this.stockName = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(this.stockName.current.value);
    console.log(this.stockName.current.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Stocks</h2>
        <label>Name:
          <input type="text" ref={this.stockName} />
        </label>
        <input type="submit" name="Submit" />
      </form>
    )
  }
}

 
export default Stocks;