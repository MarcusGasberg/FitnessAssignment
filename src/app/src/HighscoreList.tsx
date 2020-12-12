import React from "react";
import {HighScore} from "./store/HighScoreState";
import {Button} from "reactstrap";

interface IProps {
    onNewHighScore: () => void;
    highscores: HighScore[];
}

export const HighscoreList: React.FC<IProps> = ({onNewHighScore, highscores}) => {

    return (
        <div style={{marginLeft: "2rem", marginTop: "2rem"}}>
            <h2>Top 10 highscores:</h2>
            <ol>
                {highscores.map(highscore => {
                    return <li key={highscore._id}>
                        {`Name: ${highscore.name}, Score: ${highscore.score}`}
                    </li>
                })}
            </ol>
            <Button
                color="primary"
                style={{marginLeft: "1rem"}}
                onClick={onNewHighScore}
            >
                Submit score
            </Button>
        </div>
    );
}

