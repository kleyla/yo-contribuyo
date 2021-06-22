import { db, firebase, githubAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startGithubLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(githubAuthProvider)
          .then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            // console.log(user);
            saveToken(user.uid, token);
            dispatch(login(user.uid, user.displayName, user.photoURL, token));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const saveToken = (uid, token) => {
  db.collection("users").doc(uid).set({
    token: token,
  });
};

export const login = (uid, displayName, photoURL, token, nick = "") => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    photoURL,
    token,
    nick,
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
