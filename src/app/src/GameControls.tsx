import { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./GameControls.css";

export interface IProps {
  isPlaying: boolean;
  guessPosition: () => void;
  guessSound: () => void;
  play: () => void;
  pause: () => void;
}

export interface IState {
  isPlaying: boolean;
}

export class GameControls extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isPlaying: props.isPlaying,
    };

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onGuessPosition = this.onGuessPosition.bind(this);
    this.onGuessSound = this.onGuessSound.bind(this);
  }

  render() {
    return (
      <Container>
        <Row className="App-guess">
          <Col>
            <Button
              color="primary"
              style={{ marginLeft: "auto", marginRight: "1rem" }}
              onClick={this.onGuessPosition}
            >
              Position
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              style={{ marginRight: "auto", marginLeft: "1rem" }}
              onClick={this.onGuessSound}
            >
              Sound
            </Button>
          </Col>
        </Row>
        <Row className="App-controls">
          <Col>
            <Button
              color="primary"
              className={this.state.isPlaying ? "hidden" : ""}
              style={{ marginLeft: "auto", marginRight: "1rem" }}
              onClick={this.onPlay}
            >
              Play
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              className={!this.state.isPlaying ? "hidden" : ""}
              style={{ marginRight: "auto", marginLeft: "1rem" }}
              onClick={this.onPause}
            >
              Pause
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  private onGuessPosition() {
    this.props.guessPosition();
  }

  private onGuessSound() {
    this.props.guessSound();
  }

  private onPlay() {
    this.props.play();
  }

  private onPause() {
    this.props.pause();
  }
}

export default GameControls;
