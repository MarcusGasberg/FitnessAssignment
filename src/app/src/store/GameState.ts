export interface NBack {
  position: { row: number; col: number };
  sound: number;
}

export interface GameState {
  currentScore: number;
  isPlaying: boolean;
  rows: number;
  cols: number;
  speedMs: number;
  nBackSequence: NBack[];
  guessedThisRound: boolean;
}
