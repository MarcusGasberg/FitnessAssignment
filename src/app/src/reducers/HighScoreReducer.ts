import { HighScoreActionTypes } from "../constants/HighScoreTypes";
import { HighScoreState } from "../store/HighScoreState";

const initalState: HighScoreState = {
  highScores: [],
};

export function highScoreReducer(
  state = initalState,
  action: HighScoreActionTypes
): HighScoreState {
  switch (action.type) {
    case "SEND_HIGHSCORE":
      return {
        ...state,
        highScores: [...state.highScores, action.payload],
      };
    case "DELETE_HIGHSCORE":
      return {
        ...state,
        highScores: state.highScores.filter(
          (hs) => hs.name !== action.meta.name
        ),
      };
    case "UPDATE_HIGHSCORE":
      const index = state.highScores.findIndex(
        (hs) => hs.name === action.payload.name
      );
      const highScores = [...state.highScores];
      if (index !== -1) {
        highScores[index] = action.payload;
      }
      return {
        ...state,
        highScores,
      };
    default:
      return {
        ...state,
      };
  }
}
