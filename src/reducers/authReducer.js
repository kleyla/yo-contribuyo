import { types } from "../types/types";

/*
{ uid: dfsdf4156d,
name: "Karen"}
*/
// const initialState = {
//   uid: 123,
//   name: "karen",
//   dir: {
//     nro: 124,
//   },
// };

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
