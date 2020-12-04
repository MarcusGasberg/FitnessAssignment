import { Component } from "react";
import { Grid } from "./Grid";
import { Button, Container } from "reactstrap";

export interface IState {
  gridSize: number;
  score: number;
  isPlaying: boolean;
  grid: Grid;
  sequence: number[];
}

export interface IProps {
  isPlaying: boolean;
  score: number;
  gridSize: number;
}

export class Game extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      gridSize: props.gridSize,
      score: props.score,
      isPlaying: props.isPlaying,
      grid: new Grid({ gridSize: props.gridSize }),
      sequence: [],
    };
  }

  render() {
    return (
      <Container>
        <Grid key="grid" gridSize={this.state.gridSize}></Grid>
        <Button color="primary" onClick={this.onGuessPosition}>
          Position
        </Button>
        <Button color="primary" onClick={this.onGuessPosition}>
          Sound
        </Button>
      </Container>
    );
  }

  onGuessPosition() {
    console.log("Position Guess");
  }

  onGuessSound() {
    console.log("Position Guess");
  }
}

export default Game;
