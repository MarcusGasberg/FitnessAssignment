import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game/Game";
import GameControls from "./Game/GameControls";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./Login";
import { Row } from "reactstrap";
import { Highscores } from "./Highscores";
import { environment } from "./environments/environment";
import { Provider } from "react-redux";
import store from "./store/ConfigureStore";
import Register from "./Register";
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
                <Login></Login>
              </Route>
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route path="/home">
                <Row>
                  <Highscores
                    username={"tester"}
                    score={100}
                    baseUrl={environment.apiUrl}
                    apiUrl={`${environment.apiUrl}/api/highscores`}
                  />
                </Row>
                <Game></Game>
                <GameControls></GameControls>
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
