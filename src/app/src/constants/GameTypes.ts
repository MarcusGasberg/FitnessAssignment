import { GameState, NBack } from "../store/GameState";

export const ADD_NBACK = "ADD_NBACK";
export const UPDATE_GAME = "UPDATE_GAME";
export const GUESS_SOUND = "GUESS_SOUND";
export const GUESS_POSITION = "GUESS_POSITION";

interface AddNBackAction {
  type: typeof ADD_NBACK;
  payload: NBack;
}

interface GuessSoundAction {
  type: typeof GUESS_SOUND;
}

interface GuessPositionAction {
  type: typeof GUESS_POSITION;
}

interface UpdateGameAction {
  type: typeof UPDATE_GAME;
  payload: Partial<GameState>;
}

export type GameActionTypes =
  | AddNBackAction
  | UpdateGameAction
  | GuessPositionAction
  | GuessSoundAction;
