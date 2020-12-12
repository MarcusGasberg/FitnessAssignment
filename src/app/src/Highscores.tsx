import React, {Component} from "react";
import io from "socket.io-client";
import {HighscoreList} from "./HighscoreList";

import {connect} from "react-redux";
import {RootState} from "./reducers/Index";
import {environment} from "./environments/environment";

export interface IProps {
    username: string;
    score: number;
    token: string;
}

export interface IHighscore {
    _id: string;
    rank: number;
    name: string;
    score: number;
}

export interface IState {
    apiUrl: string;
    socket: SocketIOClient.Socket;
    highscoresData: IHighscore[];
}

class Highscores extends Component<IProps, IState> {
    _isMounted = false;

    constructor(props: IProps) {
        super(props);

        this.state = {
            apiUrl: `${environment.apiUrl}/api/highscores`,
            socket: io(environment.apiUrl, {transports: ['websocket']}),
            highscoresData: [],
        };

        this.onNewHighscore = this.onNewHighscore.bind(this);
        this.onNewRemoteHighscores = this.onNewRemoteHighscores.bind(this);
    }

    componentDidMount() {
        this.getHighscoresData();

        this.state.socket.on(
            "new-remote-highscores",
            ({highscores}: { highscores: string }) => {
                this.onNewRemoteHighscores(highscores);
            }
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    private onNewRemoteHighscores(highscores: string): void {
        let newHighscoresJson = JSON.stringify(highscores);
        let newHighscoresData: IHighscore[] = JSON.parse(newHighscoresJson);
        if (this._isMounted) {
            this.setState({highscoresData: newHighscoresData});
        }
    }

    private getHighscoresData(): void {
        const reqOptions = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.token}`,
            },
        };

        fetch(this.state.apiUrl, reqOptions)
            .then((highscoresData) => {
                if (highscoresData.ok) {
                    return highscoresData.json();
                }
                return Promise.resolve([]);
            })
            .then((highscoresDataJson) => {
                if (this._isMounted) {
                    this.setState({highscoresData: highscoresDataJson});
                }
            });
    }

    private onNewHighscore(): void {
        const reqOptions = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.token}`,
            },
            body: JSON.stringify({
                rank: 0,
                name: this.props.username,
                score: this.props.score,
            }),
        };

        fetch(this.state.apiUrl, reqOptions)
            .then((response) => response.json())
            .then((newRank) => {
                if (newRank <= 10) {
                    fetch(this.state.apiUrl)
                        .then((highscoresData) => highscoresData.json())
                        .then((highscoresDataJson) => {
                            this.state.socket.emit("new-highscores", {
                                highscores: highscoresDataJson,
                            });
                        });
                }
            });
    }

    render() {
        return (
            <div
                className="Highscores"
                style={{marginLeft: "2rem", marginTop: "2rem"}}
            >
                <HighscoreList highscores={this.state.highscoresData}/>
                <button
                    onClick={() => {
                        this.onNewHighscore();
                    }}
                >
                    New highscore tester
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.session.user?.token ?? "",
    username: state.session.user?.username ?? "",
    score: state.game.currentScore,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Highscores);
