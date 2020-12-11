import React, { Component } from "react";
import { NBack } from "./GameLogic";
import "./GridTile.css";

export interface IProps {
  nback?: NBack;
  flashDuration: number;
  col: number;
  row: number;
}

export interface IState {
  flashing: boolean;
}

export class GridTile extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      flashing: false,
    };
  }

  render() {
    return <div className={this.state.flashing ? "flash" : "default"}></div>;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.props.nback && this.props.nback !== prevProps.nback) {
      const flashing =
        this.props.nback.position.col === this.props.col &&
        this.props.nback.position.row === this.props.row;
      this.setState({ flashing });
      setTimeout(
        () => this.setState({ flashing: false }),
        this.props.flashDuration
      );
    }
  }
}

export default GridTile;
