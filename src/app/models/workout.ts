import {Exercise} from "./exercise";

export interface Workout {
  _id: string,
  name: string,
  username: string,
  comment: string,
  exercises: Exercise[]
}
