import { Component } from "react";
import { Dial } from "./Dial";
import "./Game.css";

export interface IState {
  gridSize: number;
  score: number;
}

export class Game extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gridSize: 3,
      score: 0,
    };
  }

  render() {
    return (
      <div className="App-dials">
        <Dial gridSize={this.state.gridSize}></Dial>
        <Dial gridSize={this.state.gridSize}></Dial>
      </div>
    );
  }
}

export default Game;
