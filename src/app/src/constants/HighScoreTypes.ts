import { HighScore } from "../store/HighScoreState";

export const SEND_HIGHSCORE = "SEND_HIGHSCORE";
export const GET_MY_HIGHSCORE = "GET_MY_HIGHSCORE";
export const UPDATE_HIGHSCORE = "UPDATE_HIGHSCORE";
export const DELETE_HIGHSCORE = "DELETE_HIGHSCORE";

interface SendHighScoreAction {
  type: typeof SEND_HIGHSCORE;
  payload: HighScore;
}

interface GetMyHighScoreAction {
  type: typeof GET_MY_HIGHSCORE;
  meta: {
    name: string;
  };
}

interface UpdateHighScoreAction {
  type: typeof UPDATE_HIGHSCORE;
  payload: HighScore;
}

interface DeleteHighScoreAction {
  type: typeof DELETE_HIGHSCORE;
  meta: {
    name: string;
  };
}

export type HighScoreActionTypes =
  | SendHighScoreAction
  | DeleteHighScoreAction
  | UpdateHighScoreAction
  | GetMyHighScoreAction;
