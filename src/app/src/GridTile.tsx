import React, { Component } from "react";
import "./GridTile.css";

export interface IProps {
  flash: boolean;
  flashDuration: number;
}

export interface IState {
  activeClass: string;
  flashing: boolean;
}

export class GridTile extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activeClass: "default",
      flashing: false,
    };
  }

  render() {
    return <div className={this.state.activeClass}></div>;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (
      prevState.activeClass !== "flash" &&
      this.props.flash &&
      !this.state.flashing
    ) {
      this.setState({ activeClass: "flash", flashing: true });
      setTimeout(
        () => this.setState({ activeClass: "default", flashing: false }),
        this.props.flashDuration
      );
    }
  }
}

export default GridTile;
