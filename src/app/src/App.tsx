import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import { Button } from "reactstrap";

export interface IState {
  gridSize: number;
  score: number;
  isPlaying: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      gridSize: 3,
      score: 0,
      isPlaying: false,
    };

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dual-n-Back</h1>
        </header>
        <Game
          gridSize={this.state.gridSize}
          score={this.state.score}
          isPlaying={this.state.isPlaying}
        ></Game>
        <Button
          color="primary"
          className={this.state.isPlaying ? "hidden" : ""}
          onClick={this.onPlay}
        >
          Play
        </Button>
        <Button
          color="primary"
          className={!this.state.isPlaying ? "hidden" : ""}
          onClick={this.onPause}
        >
          Pause
        </Button>
      </div>
    );
  }

  private onPlay() {
    console.log("Playing");
    this.setState({ isPlaying: true });
  }

  private onPause() {
    console.log("Pausing");
    this.setState({ isPlaying: false });
  }
}

export default App;
