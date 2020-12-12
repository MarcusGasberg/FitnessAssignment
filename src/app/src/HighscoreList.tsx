import React from "react";
import {HighScore} from "./store/HighScoreState";

interface IProps {
    highscores: HighScore[]
}

export const HighscoreList: React.FC<IProps> = ({highscores}) => {

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
        </div>
    );
}

