import React, {Component} from "react";
import io from 'socket.io-client';
import {HighscoreList} from "./HighscoreList";

export interface IProps {
    username: string,
    score: number,
    baseUrl: string,
    apiUrl: string
}

export interface IHighscore {
    _id: string,
    rank: number,
    name: string,
    score: number
}

export interface IState {
    socket: SocketIOClient.Socket;
    highscoresData: IHighscore[]
}

export class Highscores extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            socket: io(this.props.baseUrl),
            highscoresData: [],
        };

        this.onNewHighscore = this.onNewHighscore.bind(this);
        this.onNewRemoteHighscores = this.onNewRemoteHighscores.bind(this);
    }

    componentDidMount() {
        this.getHighscoresData();

        this.state.socket.on(
            'new-remote-highscores',
            ({highscores}: { highscores: string }) => {
                this.onNewRemoteHighscores(highscores);
            }
        );
    }

    private onNewRemoteHighscores(highscores: string): void {
        let newHighscoresJson = JSON.stringify(highscores);
        let newHighscoresData: IHighscore[] = JSON.parse(newHighscoresJson);
        this.setState({highscoresData: newHighscoresData});
    }

    private getHighscoresData(): void {
        fetch(this.props.apiUrl)
            .then(highscoresData => highscoresData.json())
            .then(highscoresDataJson => {
                this.setState({highscoresData: highscoresDataJson});
            });
    }

    private onNewHighscore(): void {
        fetch(this.props.apiUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "rank": 0,
                "name": this.props.username,
                "score": this.props.score
            })
        })
            .then((response) => response.json())
            .then((newRank) => {
                if (newRank <= 10) {
                    fetch(this.props.apiUrl)
                        .then(highscoresData => highscoresData.json())
                        .then(highscoresDataJson => {
                            this.state.socket.emit('new-highscores', {
                                highscores: highscoresDataJson
                            });
                        });
                }
            });
    }

    render() {
        return (
            <div className="Highscores"
                 style={{marginLeft: "2rem", marginTop: "2rem"}}>
                <HighscoreList highscores={this.state.highscoresData}/>
                <button onClick={() => {
                    this.onNewHighscore();
                }}>
                    New highscore tester
                </button>
            </div>
        );
    }

}

