export interface HighScore {
  rank: number;
  name: string;
  score: number;
}

export interface HighScoreState {
  highScores: HighScore[];
}
