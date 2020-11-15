import {Exercise} from "./exercise";

export interface Workout {
  name: string,
  username: string,
  comment: string,
  exercises: Exercise[]
}
