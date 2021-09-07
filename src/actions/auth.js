import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password ) => {
    return (dispatch) => {
        dispatch(login(123,'pedro'));
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user })  => {
                dispatch(
                    login(user.multiFactor.user.uid,user.multiFactor.user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload:{
        uid,
        displayName
    }
});