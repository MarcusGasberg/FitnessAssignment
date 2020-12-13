import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import { connect } from "react-redux";
import { RootState } from "./reducers/Index";
import { thunkRegister } from "./actions/SessionActions";
import { User } from "./store/User";
import { Redirect } from "react-router-dom";

export interface IState {
  username: string;
  password: string;
  email: string;
  fullname: string;
  error: string;
  redirectTo: string;
}

export interface IProps {
  register: (user: Partial<User>) => any;
}

class Register extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      fullname: "",
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
      <div className="App-Register" style={{ margin: "2rem 20rem" }}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup key="username">
            <Label>Username</Label>
            <Input
              autoFocus
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              autoFocus
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Fullname</Label>
            <Input
              autoFocus
              value={this.state.fullname}
              onChange={(e) => this.setState({ fullname: e.target.value })}
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
            Register
          </Button>
          <div>{this.state.error}</div>
        </Form>
        <Button
          style={{ marginTop: "1rem" }}
          block
          size="lg"
          onClick={() => this.redirectTo("/login")}
        >
          Or Login
        </Button>
      </div>
    );
  }

  private redirectTo(path: string) {
    this.setState({ redirectTo: path });
  }

  onSubmit(event: any): void {
    event.preventDefault();
    this.props
      .register({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        fullname: this.state.fullname,
      })
      .then(
        () => this.redirectTo("/home"),
        (err: Error) => this.setState({ error: err.message })
      );
  }

  private validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.email.length > 0
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  register: thunkRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
