import React, { Component } from "react";
import "./GridTile.css";

export interface IProps {
  flash: boolean;
}

export class GridTile extends Component<IProps> {
  render() {
    return <div className={this.props.flash ? "flash" : "default"}></div>;
  }
}

export default GridTile;
