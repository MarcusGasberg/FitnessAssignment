export interface HighScore {
  _id: string;
  rank: number;
  name: string;
  score: number;
}

export interface HighScoreState {
  newHighScore: boolean;
  highScores: HighScore[];
}
