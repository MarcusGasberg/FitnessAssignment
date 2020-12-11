import React from "react";
import {IHighscore} from "./Highscores";

interface IProps {
    highscores: IHighscore[]
}

export const HighscoreList: React.FC<IProps> = ({highscores}) => {

    return (
        <div>
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

