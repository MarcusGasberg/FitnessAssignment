import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { range } from "./Utils";

export interface IState {
  gridSize: number;
}

export interface IProps {
  gridSize: number;
}
export class Dial extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gridSize: 3,
    };
  }

  render() {
    return (
      <Container>
        {range(0, this.state.gridSize).map((i) => (
          <Row>
            {range(0, this.state.gridSize).map((j) => (
              <button key={j}>{j}</button>
            ))}
          </Row>
        ))}
      </Container>
    );
  }
}

export default Dial;
