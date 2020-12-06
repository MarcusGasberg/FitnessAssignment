import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import GameControls from "./GameControls";
import { GameLogic } from "./GameLogic";
import { Subscription } from "rxjs";

export interface IState {
  rows: number;
  cols: number;
  score: number;
  isPlaying: boolean;
  gameLogic: GameLogic;
  sub: Subscription;
  sequenceInterval: number;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    const rows = 3;
    const cols = 3;
    const sequenceInterval = 3000;
    const gameLogic = new GameLogic(rows, cols, sequenceInterval);

    const sub = gameLogic.getScore().subscribe((score) => {
      this.setState({ score });
    });

    this.state = {
      rows,
      cols,
      score: 0,
      isPlaying: false,
      gameLogic,
      sub,
      sequenceInterval,
    };

    this.onGuessPosition = this.onGuessPosition.bind(this);
    this.onGuessSound = this.onGuessSound.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dual-n-Back</h1>
        </header>
        <Game
          rows={this.state.rows}
          cols={this.state.cols}
          score={this.state.score}
          isPlaying={this.state.isPlaying}
          speedMs={10000}
          gameLogic={this.state.gameLogic}
        ></Game>
        <GameControls
          isPlaying={this.state.isPlaying}
          guessPosition={this.onGuessPosition}
          guessSound={this.onGuessSound}
          play={this.onPlay}
          pause={this.onPause}
        ></GameControls>
      </div>
    );
  }

  private onPause() {
    this.setState({ isPlaying: false });
  }

  private onPlay() {
    this.setState({ isPlaying: true });
  }

  private onGuessPosition() {
    this.state.gameLogic.guessPosition();
  }

  private onGuessSound() {
    this.state.gameLogic.guessPosition();
  }
}

export default App;
