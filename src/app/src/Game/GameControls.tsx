import React, { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./GameControls.css";

import { connect } from "react-redux";
import { RootState } from "../reducers/Index";
import {
  GUESS_POSITION,
  GUESS_SOUND,
  UPDATE_GAME,
} from "../constants/GameTypes";

export interface IProps {
  isPlaying: boolean;
  guessPosition: () => void;
  guessSound: () => void;
  play: () => void;
  pause: () => void;
}

export class GameControls extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

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
              className={this.props.isPlaying ? "hidden" : ""}
              style={{ marginLeft: "auto", marginRight: "1rem" }}
              onClick={this.onPlay}
            >
              Play
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              className={!this.props.isPlaying ? "hidden" : ""}
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
    if (this.props.isPlaying) {
      this.props.guessPosition();
    }
  }

  private onGuessSound() {
    if (this.props.isPlaying) {
      this.props.guessSound();
    }
  }

  private onPlay() {
    this.props.play();
  }

  private onPause() {
    this.props.pause();
  }
}

const mapStateToProps = (state: RootState) =>
  ({
    isPlaying: state.game.isPlaying,
  } as IProps);

const mapDispatchToProps = {
  play: () => ({ type: UPDATE_GAME, payload: { isPlaying: true } }),
  pause: () => ({ type: UPDATE_GAME, payload: { isPlaying: false } }),
  guessSound: () => ({ type: GUESS_SOUND }),
  guessPosition: () => ({ type: GUESS_POSITION }),
};

export default connect(mapStateToProps, mapDispatchToProps)(GameControls);