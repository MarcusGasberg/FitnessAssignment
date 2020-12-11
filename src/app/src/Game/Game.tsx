import { Component } from "react";
import { Grid } from "./Grid";
import { Container } from "reactstrap";
import { Subscription } from "rxjs";
import { NBack, GameLogic } from "./GameLogic";

export interface IState {
  nback?: NBack;
  subs: Subscription;
}

export interface IProps {
  isPlaying: boolean;
  score: number;
  rows: number;
  cols: number;
  speedMs: number;
  gameLogic: GameLogic;
}

export class Game extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      subs: new Subscription(),
    };
  }

  render() {
    return (
      <Container>
        <h2>Score: {this.props.score}</h2>
        <Grid
          key="grid"
          rows={this.props.rows}
          cols={this.props.cols}
          nback={this.state.nback}
          isPlaying={this.props.isPlaying}
        ></Grid>
      </Container>
    );
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (!prevProps.isPlaying && this.props.isPlaying) {
      this.setState({
        subs: this.props.gameLogic.subscribeToSequence((nback: NBack) => {
          this.setState({ nback });
          this.speak(nback.sound.toString());
        }),
      });
    }

    if (prevProps.isPlaying && !this.props.isPlaying) {
      this.state.subs.unsubscribe();
    }
  }

  componentWillUnmount() {
    this.state.subs.unsubscribe();
  }

  private speak(text: string) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.voice = speechSynthesis.getVoices().filter((voice) => {
        return voice.name === "Allison";
      })[0];
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }

  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const nextState: Partial<IState> = {
      nback: prevState.nback,
      subs: prevState.subs,
    };

    return nextState;
  }
}

export default Game;
