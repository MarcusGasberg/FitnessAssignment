import {
  DELETE_HIGHSCORE,
  GET_MY_HIGHSCORE,
  HighScoreActionTypes,
  SEND_HIGHSCORE,
  UPDATE_HIGHSCORE,
} from "../constants/HighScoreTypes";
import { HighScore } from "../store/HighScoreState";

export function sendHighScore(newScore: HighScore): HighScoreActionTypes {
  return {
    type: SEND_HIGHSCORE,
    payload: newScore,
  };
}

export function updateHighScore(newScore: HighScore): HighScoreActionTypes {
  return {
    type: UPDATE_HIGHSCORE,
    payload: newScore,
  };
}

export function deleteHighScore(name: string): HighScoreActionTypes {
  return {
    type: DELETE_HIGHSCORE,
    meta: {
      name,
    },
  };
}

export function getMyHighScore(name: string): HighScoreActionTypes {
  return {
    type: GET_MY_HIGHSCORE,
    meta: {
      name,
    },
  };
}
