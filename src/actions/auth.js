import { firebase, githubAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startGithubLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(githubAuthProvider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        dispatch(login(user.uid, user.displayName, user.photoURL, token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const login = (uid, displayName, photoURL, token) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    photoURL,
    token,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
