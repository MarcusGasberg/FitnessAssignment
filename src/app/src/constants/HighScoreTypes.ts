import {HighScoreState} from "../store/HighScoreState";

export const GET_HIGHSCORES = "GET_HIGHSCORES";
export const NEW_HIGHSCORE = "NEW_HIGHSCORE";

interface GetHighScoresAction {
    type: typeof GET_HIGHSCORES;
    payload: HighScoreState;
}

interface NewHighScoreAction {
    type: typeof NEW_HIGHSCORE;
}

export type HighScoreActionTypes =
    | GetHighScoresAction
    | NewHighScoreAction;

