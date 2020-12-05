import { Component } from "react";
import { Grid } from "./Grid";
import { Container } from "reactstrap";
import { Subscription } from "rxjs";
import { NBack, GameLogic } from "./GameLogic";
import React from "react";

export interface IState {
  score: number;
  nback: NBack;
  subs: Subscription;
}

export interface IProps {
  isPlaying: boolean;
  score: number;
  gridSize: number;
  speedMs: number;
  gameLogic: GameLogic;
}

export class Game extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      nback: { position: { row: -1, col: -1 }, sound: -1 },
      score: 0,
      subs: new Subscription(),
    };
  }

  render() {
    return (
      <Container>
        <Grid
          key="grid"
          gridSize={this.props.gridSize}
          nback={this.state.nback}
        ></Grid>
      </Container>
    );
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (!prevProps.isPlaying && this.props.isPlaying) {
      this.setState({
        subs: this.props.gameLogic.subscribeToSequence((nback: NBack) => {
          this.setState({ nback });
        }),
      });
    }

    if (prevProps.isPlaying && !this.props.isPlaying) {
      this.state.subs.unsubscribe();
    }
  }
}

export default Game;
