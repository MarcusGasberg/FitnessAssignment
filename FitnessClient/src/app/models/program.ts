import {Exercise} from "./exercise";

export interface Program {
  name: string,
  username: string,
  exercises: Exercise[]
}
