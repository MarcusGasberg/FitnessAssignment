import {
  ADD_NBACK,
  GameActionTypes,
  UPDATE_GAME,
} from "../constants/GameTypes";
import { GameState, NBack } from "../store/GameState";

export function addNBack(newNBack: NBack): GameActionTypes {
  return {
    type: ADD_NBACK,
    payload: newNBack,
  };
}

export function updateGame(game: Partial<GameState>): GameActionTypes {
  return {
    type: UPDATE_GAME,
    payload: game,
  };
}
