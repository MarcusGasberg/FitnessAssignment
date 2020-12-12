import {HighScoreActionTypes} from "../constants/HighScoreTypes";
import {HighScoreState} from "../store/HighScoreState";

const initalState: HighScoreState = {
    newHighScore: false,
    highScores: [],
};

export function highScoreReducer(
    state = initalState,
    action: HighScoreActionTypes
): HighScoreState {
    switch (action.type) {
        case "GET_HIGHSCORES":
            return {...action.payload}
        case "NEW_HIGHSCORE":
            return {
                ...state,
                newHighScore: true
            }
        default:
            return {
                ...state,
            };
    }
}
