import _ from "lodash";
import { GameActionTypes, GUESS_SOUND } from "../constants/GameTypes";
import { GameState, NBack } from "../store/GameState";

const correctAnswer = 100;
const wrongAnswer = -50;
const probSamePct = 15;

const initalState: GameState = {
  nBackSequence: [],
  currentScore: 0,
  cols: 2,
  rows: 2,
  isPlaying: false,
  speedMs: 2500,
  guessedThisRound: false,
};

export function gameReducer(
  state = initalState,
  action: GameActionTypes
): GameState {
  switch (action.type) {
    case "ADD_NBACK":
      return {
        ...state,
        guessedThisRound: false,
        nBackSequence: [...state.nBackSequence, action.payload],
      };
    case "UPDATE_GAME":
      return {
        ...state,
        ...action.payload,
      };
    case "GUESS_POSITION":
      return guessPosition(state);

    case GUESS_SOUND:
      return guessSound(state);
    default:
      return { ...state };
  }
}

function guessPosition(game: GameState): GameState {
  const result = { ...game };
  if (game.nBackSequence.length < 2 || game.guessedThisRound) {
    return result;
  }

  if (isPreviousTwoSame(game, (nb: NBack) => nb.position)) {
    result.currentScore += correctAnswer;
  } else {
    result.currentScore += wrongAnswer;
  }
  result.guessedThisRound = true;

  return result;
}

function guessSound(game: GameState): GameState {
  const result = { ...game };
  if (game.nBackSequence.length < 2 || game.guessedThisRound) {
    return result;
  }

  if (isPreviousTwoSame(game, (nb: NBack) => nb.sound)) {
    result.currentScore += correctAnswer;
  } else {
    result.currentScore += wrongAnswer;
  }
  result.guessedThisRound = true;

  return result;
}

export function createNBack(game: GameState): NBack {
  const samePosition = isNextSame(game);
  let position = samePosition
    ? game.nBackSequence[game.nBackSequence.length - 1].position
    : {
        row: getRandomInt(0, game.rows),
        col: getRandomInt(0, game.cols),
      };

  let sound =
    !samePosition && isNextSame(game)
      ? game.nBackSequence[game.nBackSequence.length - 1].sound
      : getRandomInt(0, 9);

  const nback: NBack = {
    position,
    sound,
  };
  return nback;
}

function isNextSame(game: GameState): boolean {
  if (!game.nBackSequence || game.nBackSequence.length < 2) {
    return false;
  }

  return getRandomInt(0, 100) <= probSamePct;
}

function isPreviousTwoSame(
  game: GameState,
  prop: (nback: NBack) => any
): boolean {
  const last = prop(game.nBackSequence[game.nBackSequence.length - 1]);
  const secondToLast = prop(game.nBackSequence[game.nBackSequence.length - 2]);
  return _.isEqual(last, secondToLast);
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
