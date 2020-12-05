import { BehaviorSubject, Observable } from "rxjs";
import { interval, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as _ from "lodash";

export class GameLogic {
  private readonly correctAnswer = 100;
  private readonly wrongAnswer = -50;
  private readonly history = new Array<NBack>();
  private _score$ = new BehaviorSubject<number>(0);
  private sequenceGenerator$ = interval(2000).pipe(
    map((_) => {
      const nback = {
        position: {
          row: this.getRandomInt(0, this.rows),
          col: this.getRandomInt(0, this.cols),
        },
        sound: 0,
      } as NBack;
      return nback;
    })
  );

  constructor(private rows: number, private cols: number) {}

  public getScore(): Observable<number> {
    return this._score$.asObservable();
  }
  public setScore(value: number) {
    this._score$.next(value);
  }

  guessPosition() {
    if (this.history.length < 2) {
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
  }

  guessSound() {
    if (this.history.length < 2) {
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
  }

  subscribeToSequence(callback: (nback: NBack) => void): Subscription {
    return this.sequenceGenerator$
      .pipe(tap((nback) => this.history.push(nback)))
      .subscribe({ next: callback });
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
