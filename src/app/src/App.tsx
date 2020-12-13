import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game/Game";
import GameControls from "./Game/GameControls";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./Login";
import { Col, Row, Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store/ConfigureStore";
import Register from "./Register";
import Highscores from "./Highscores";

class App extends React.Component {
  render() {
    const userFullName = store.getState().session.user?.fullname;
    const title = !!userFullName ? (
      <h1 className="App-title">Welcome to Dual-n-Back, {userFullName}</h1>
    ) : (
      <h1 className="App-title">Welcome to Dual-n-Back</h1>
    );
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              {title}
            </header>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/home">
                <Container fluid="small">
                  <Row>
                    <Col xs={16} md={12} lg={8}>
                      <Game />
                      <GameControls />
                    </Col>
                    <Col xs={8} md={6} lg={4}>
                      <Highscores />
                    </Col>
                  </Row>
                </Container>
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
