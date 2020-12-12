import {GET_HIGHSCORES, HighScoreActionTypes, NEW_HIGHSCORE} from "../constants/HighScoreTypes";
import {HighScore, HighScoreState} from "../store/HighScoreState";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/Index";
import {Action} from "redux";
import {environment} from "../environments/environment";

export function getHighScores(highscores: HighScoreState): HighScoreActionTypes {
    return {
        type: GET_HIGHSCORES,
        payload: highscores
    };
}

export function newHighScore(): HighScoreActionTypes {
    return {
        type: NEW_HIGHSCORE
    };
}

export const thunkGetHighscores = (
    token: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    const reqOptions = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const asyncResp = await fetch(
        `${environment.apiUrl}/api/highscores`,
        reqOptions
    );
    if (asyncResp.ok) {
        const highscoresData = (await asyncResp.json()) as HighScore[];
        dispatch(
            getHighScores({
                newHighScore: false,
                highScores: highscoresData
            })
        );
    }
}

export const thunkSendHighscore = (
    name: string,
    score: number,
    token: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    const reqOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            rank: 0,
            name: name,
            score: score,
        })
    };
    const asyncResp = await fetch(
        `${environment.apiUrl}/api/highscores`,
        reqOptions
    );
    if (asyncResp.ok) {
        const newRank = (await asyncResp.json());
        if (newRank <= 10) {
            dispatch(newHighScore());
        }
    }
}
