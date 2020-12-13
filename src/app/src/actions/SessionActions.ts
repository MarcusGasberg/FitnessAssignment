import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { SessionActionTypes, UPDATE_SESSION } from "../constants/SessionTypes";
import { environment } from "../environments/environment";
import { RootState } from "../reducers/Index";
import { SessionState } from "../store/SessionState";
import { User } from "../store/User";

export function updateSession(session: SessionState): SessionActionTypes {
  return {
    type: UPDATE_SESSION,
    payload: session,
  };
}

export const thunkLogin = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };
  const asyncResp = await fetch(
    `${environment.apiUrl}/api/users/sign-in`,
    requestOptions
  );
  if (asyncResp.ok) {
    const user = (await asyncResp.json()) as User;
    dispatch(
      updateSession({
        user,
      })
    );
  }
};

export const thunkRegister = (
  newUser: Partial<User>
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  };
  const url = `${environment.apiUrl}/api/users/register`;
  const asyncResp = await fetch(url, requestOptions);
  if (asyncResp.ok) {
    const user = await asyncResp.json();
    dispatch(
      updateSession({
        user,
      })
    );
  } else {
    const body = await asyncResp.json();
    throw body;
  }
};

export const thunkLogout = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };
  const asyncResp = await fetch(
    `${environment.apiUrl}/api/users/sign-out`,
    requestOptions
  );
  if (asyncResp.ok) {
    dispatch(
      updateSession({
        user: null,
      })
    );
  }
};
