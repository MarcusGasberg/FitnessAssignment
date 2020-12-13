import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import { connect } from "react-redux";
import { RootState } from "./reducers/Index";
import { thunkLogin } from "./actions/SessionActions";
import { Redirect } from "react-router-dom";

export interface IState {
  username: string;
  password: string;
  redirectTo: string;
  error: string;
}

export interface IProps {
  login: (username: string, password: string) => any;
}

class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      redirectTo: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <div className="App-Login" style={{ margin: "2rem 20rem" }}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              autoFocus
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
        <Button
          style={{ marginTop: "1rem" }}
          block
          size="lg"
          onClick={() => this.redirectTo("/register")}
        >
          Or Register
        </Button>
      </div>
    );
  }

  onSubmit(event: any): void {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password).then(
      () => this.redirectTo("/home"),
      (err: Error) => this.setState({ error: err.message })
    );
  }

  private redirectTo(path: string) {
    this.setState({ redirectTo: path });
  }

  private validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  login: thunkLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
