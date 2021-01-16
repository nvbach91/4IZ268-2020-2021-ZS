import React, { Component } from "react";

class DataError extends React.Component {
    render() {
      return (
        <div className="container">
            <div class="alert alert-danger" role="alert">{this.props.errorMessage}</div>
        </div>
      );
    }
}

export default DataError;