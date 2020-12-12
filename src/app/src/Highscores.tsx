import React, {Component} from "react";
import io from "socket.io-client";
import {HighscoreList} from "./HighscoreList";

import {connect} from "react-redux";
import {RootState} from "./reducers/Index";
import {environment} from "./environments/environment";
import {thunkGetHighscores, thunkSendHighscore} from "./actions/HighScoreActions";
import {HighScore} from "./store/HighScoreState";
import {GET_HIGHSCORES} from "./constants/HighScoreTypes";

export interface IProps {
    username: string;
    score: number;
    token: string;
    newHighscore: boolean;
    highscores: HighScore[];
    getHighscores: (token: string) => any;
    sendHighscore: (name: string, score: number, token: string) => any;
    updateHighscores: (highscores: HighScore[]) => any;
}

export interface IState {
    socket: SocketIOClient.Socket;
}

class Highscores extends Component<IProps, IState> {
    _isMounted = false;

    constructor(props: IProps) {
        super(props);

        this.state = {
            socket: io(environment.apiUrl)
        };

        this.onNewHighscore = this.onNewHighscore.bind(this);
        this.onNewRemoteHighscores = this.onNewRemoteHighscores.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.getHighscores(this.props.token);

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
        let newHighscoresData: HighScore[] = JSON.parse(newHighscoresJson);
        if (this._isMounted) {
            this.props.updateHighscores(newHighscoresData);
        }
    }

    private onNewHighscore(): void {
        this.props.sendHighscore(
            this.props.username,
            this.props.score,
            this.props.token
        ).then(() => {
            if (this.props.newHighscore) {
                this.props.getHighscores(
                    this.props.token
                ).then(() => {
                    this.state.socket.emit("new-highscores", {
                        highscores: this.props.highscores,
                    });
                })
            }
        })
    }

    render() {
        return (
            <div>
                <HighscoreList highscores={this.props.highscores}/>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.session.user?.token ?? "",
    username: state.session.user?.username ?? "",
    score: state.game.currentScore,
    highscores: state.highScore.highScores,
    newHighscore: state.highScore.newHighScore
});

const mapDispatchToProps = {
    getHighscores: thunkGetHighscores,
    sendHighscore: thunkSendHighscore,
    updateHighscores: (highscores: HighScore[]) => ({
        type: GET_HIGHSCORES,
        payload: {
            newHighScore: false,
            highScores: highscores
        }
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Highscores);
