import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import GameControls from "./GameControls";
import { GameLogic } from "./GameLogic";

export interface IState {
  gridSize: number;
  score: number;
  isPlaying: boolean;
  gameLogic: GameLogic;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    const gridSize = 2;
    const gameLogic = new GameLogic(gridSize, gridSize);

    this.state = {
      gridSize,
      score: 0,
      isPlaying: false,
      gameLogic,
    };

    gameLogic.getScore().subscribe((score) => this.setState({ score }));

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
        <h2>Score: {this.state.score}</h2>
        <Game
          gridSize={this.state.gridSize}
          score={this.state.score}
          isPlaying={this.state.isPlaying}
          speedMs={2000}
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

  private onScoreChange(score: number) {
    console.log(score);
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

  private onGuessSound() {}
}

export default App;
