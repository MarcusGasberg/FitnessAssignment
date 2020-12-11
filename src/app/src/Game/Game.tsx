import { Component } from "react";
import { Grid } from "./Grid";
import { Container } from "reactstrap";
import { interval, Observable, Subscription } from "rxjs";
import { RootState } from "../reducers/Index";
import { connect } from "react-redux";
import { NBack } from "../store/GameState";
import { createNBack } from "../reducers/GameReducer";
import { map, tap } from "rxjs/operators";
import { ADD_NBACK } from "../constants/GameTypes";
import { Redirect } from "react-router-dom";

export interface IState {
  nback?: NBack;
  subs: Subscription;
}

export interface IProps {
  score: number;
  isPlaying: boolean;
  rows: number;
  cols: number;
  speedMs: number;
  sequenceGenerator: Observable<NBack>;
  newNBack: (nback: NBack) => void;
  authenticated: boolean;
}

export class Game extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      subs: new Subscription(),
    };
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }

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
        subs: this.props.sequenceGenerator.subscribe((nback: NBack) => {
          this.setState({ nback });
          this.speak(nback.sound.toString());
          this.props.newNBack(nback);
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

const mapStateToProps = (state: RootState) =>
  ({
    score: state.game.currentScore,
    cols: state.game.cols,
    isPlaying: state.game.isPlaying,
    rows: state.game.rows,
    speedMs: state.game.speedMs,
    sequenceGenerator: interval(state.game.speedMs).pipe(
      map(() => createNBack(state.game))
    ),
    authenticated: !!state.session.user?.token,
  } as IProps);

const mapDispatchToProps = {
  newNBack: (nback: NBack) => ({ type: ADD_NBACK, payload: nback }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
