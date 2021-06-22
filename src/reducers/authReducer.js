import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        photoURL: action.payload.photoURL,
        token: action.payload.token,
        nick: action.payload.nick,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
