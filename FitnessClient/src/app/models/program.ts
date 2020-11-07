import {Exercise} from "./exercise";

export interface Program {
  _id: string,
  name: string,
  username: string,
  exercises: Exercise[]
}
