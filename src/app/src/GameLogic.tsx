import { BehaviorSubject, Observable } from "rxjs";
import { interval, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as _ from "lodash";

export class GameLogic {
  private readonly correctAnswer = 100;
  private readonly wrongAnswer = -50;
  private readonly probSamePct = 15;
  private hasGuessedThisRound = false;
  private readonly history = new Array<NBack>();
  private _score$ = new BehaviorSubject<number>(0);
  private sequenceGenerator$: Observable<NBack>;

  constructor(
    private rows: number,
    private cols: number,
    sequenceInterval: number
  ) {
    this.sequenceGenerator$ = interval(sequenceInterval).pipe(
      tap(() => (this.hasGuessedThisRound = false)),
      map((_) => this.createNBack())
    );
  }

  public getScore(): Observable<number> {
    return this._score$.asObservable();
  }
  public setScore(value: number) {
    this._score$.next(value);
  }

  guessPosition() {
    if (this.history.length < 2 || this.hasGuessedThisRound) {
      return;
    }

    const currScore = this._score$.getValue();

    if (
      _.isEqual(
        this.history[this.history.length - 1].position,
        this.history[this.history.length - 2].position
      )
    ) {
      this._score$.next(currScore + this.correctAnswer);
    } else {
      this._score$.next(currScore + this.wrongAnswer);
    }
    this.hasGuessedThisRound = true;
  }

  guessSound() {
    if (this.history.length < 2 || this.hasGuessedThisRound) {
      return;
    }

    const currScore = this._score$.getValue();

    if (
      _.isEqual(
        this.history[this.history.length - 1].sound,
        this.history[this.history.length - 2].sound
      )
    ) {
      this._score$.next(currScore + this.correctAnswer);
    } else {
      this._score$.next(currScore + this.wrongAnswer);
    }
    this.hasGuessedThisRound = true;
  }

  subscribeToSequence(callback: (nback: NBack) => void): Subscription {
    return this.sequenceGenerator$
      .pipe(tap((nback) => this.history.push(nback)))
      .subscribe({ next: callback });
  }

  createNBack(): NBack {
    let position = this.isNextSame()
      ? this.history[this.history.length - 1].position
      : {
          row: this.getRandomInt(0, this.rows),
          col: this.getRandomInt(0, this.cols),
        };

    let sound = this.isNextSame()
      ? this.history[this.history.length - 1].sound
      : this.getRandomInt(0, 9);

    const nback = {
      position,
      sound,
    } as NBack;
    return nback;
  }

  isNextSame(): boolean {
    if (!this.history || this.history.length < 2) {
      return false;
    }

    return this.getRandomInt(0, 100) <= this.probSamePct;
  }

  isPreviousTwoSame(prop: (nback: NBack) => number): boolean {
    const last = prop(this.history[this.history.length - 1]);
    const secondToLast = prop(this.history[this.history.length - 2]);
    return _.isEqual(last, secondToLast);
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export interface NBack {
  position: { row: number; col: number };
  sound: number;
}
