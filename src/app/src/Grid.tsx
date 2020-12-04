import { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import GridTile from "./GridTile";
import { range } from "./Utils";
import "./Grid.css";

export interface IState {
  gridSize: number;
  flashDurationMs: number;
}

export interface IProps {
  gridSize: number;
}

export class Grid extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      gridSize: props.gridSize,
      flashDurationMs: 1000,
    };
  }

  render() {
    return (
      <Container>
        {range(0, this.state.gridSize - 1).map((i) => (
          <Row key={"row" + i} style={{ border: "1rem none black" }}>
            {range(0, this.state.gridSize - 1).map((j) => (
              <Col
                key={i * this.state.gridSize + j}
                className="border border-dark"
              >
                <GridTile flash={true}></GridTile>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    );
  }

  doFlash(num: number) {}
}

export default Grid;
