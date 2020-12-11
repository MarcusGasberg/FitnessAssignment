import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export interface IState {
  email: string;
  password: string;
}

export default class Login extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <div className="App-Login" style={{ margin: "2rem 20rem" }}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup controlId="email">
            <Label>Email</Label>
            <Input
              autoFocus
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <Label>Password</Label>
            <Input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }

  onSubmit(event: any): void {
    event.preventDefault();
  }

  private validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
}
