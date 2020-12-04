import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import { Container } from "reactstrap";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dual-n-Back</h1>
        </header>
        <Game></Game>
      </div>
    );
  }
}

export default App;
