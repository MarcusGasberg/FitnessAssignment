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
  gridSize: number;
  nback: NBack;
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
        {range(0, this.props.gridSize - 1).map((i) => (
          <Row key={"row" + i} style={{ border: "1rem none black" }}>
            {range(0, this.props.gridSize - 1).map((j) => (
              <Col
                key={i * this.props.gridSize + j}
                className="border border-dark"
              >
                <GridTile
                  key={"gt" + i * this.props.gridSize + j}
                  flash={
                    i === this.props.nback.position.col &&
                    j === this.props.nback.position.row
                  }
                  flashDuration={this.state.flashDurationMs}
                ></GridTile>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    );
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {}
}

export default Grid;
