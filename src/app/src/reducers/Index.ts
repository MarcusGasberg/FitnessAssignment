import { combineReducers } from "redux";
import { gameReducer } from "./GameReducer";
import { highScoreReducer } from "./HighScoreReducer";
import { sessionReducer } from "./SessionReducer";

export const rootReducer = combineReducers({
  highScore: highScoreReducer,
  session: sessionReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
