import React, { Component } from "react";

export default class FourOhFour extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column",
          height: "100vh",
          color: "#444"
        }}
      >
        <h1 style={{ fontSize: "5rem" }}>404!</h1>
        <h2>The page you are looking for doesn't exits.</h2>
      </div>
    );
  }
}