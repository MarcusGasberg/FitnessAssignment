import { SessionActionTypes } from "../constants/SessionTypes";
import { SessionState } from "../store/SessionState";

const initialState: SessionState = {
  user: {
    email: "",
    fullname: "",
    username: "",
  },
};

export function sessionReducer(
  state = initialState,
  action: SessionActionTypes
) {
  switch (action.type) {
    case "UPDATE_SESSION":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
