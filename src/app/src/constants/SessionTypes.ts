import { SessionState } from "../store/SessionState";

export const UPDATE_SESSION = "UPDATE_SESSION";
export const LOGIN_SESSION = "LOGIN_SESSION";

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SessionState;
}

interface LoginAction {
  type: typeof LOGIN_SESSION;
  payload: {
    username: string;
    password: string;
  };
}

export type SessionActionTypes = UpdateSessionAction | LoginAction;
