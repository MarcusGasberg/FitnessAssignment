import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import GridTile from "./GridTile";
import { range } from "./Utils";
import "./Grid.css";
import { NBack } from "./GameLogic";

export interface IState {
  flashDurationMs: number;
}

export interface IProps {
  rows: number;
  cols: number;
  nback?: NBack;
  isPlaying: boolean;
}

export class Grid extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      flashDurationMs: 500,
    };
  }

  render() {
    return (
      <Container>
        {range(0, this.props.rows - 1).map((i) => (
          <Row key={"row" + i} style={{ border: "1rem none black" }}>
            {range(0, this.props.cols - 1).map((j) => (
              <Col
                key={i * (this.props.rows * this.props.cols) + j}
                className="border border-dark"
              >
                <GridTile
                  key={"gt" + i * (this.props.rows * this.props.cols) + j}
                  row={i}
                  col={j}
                  nback={this.props.nback}
                  flashDuration={this.state.flashDurationMs}
                ></GridTile>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    );
  }
}

export default Grid;
