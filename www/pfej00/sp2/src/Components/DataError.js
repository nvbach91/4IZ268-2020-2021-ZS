import React, { Component } from "react";

class DataError extends Component {
    render() {
      return (
        <div className="alert alert-danger" role="alert">{this.props.errorMessage}</div>
      );
    }
}

export default DataError;