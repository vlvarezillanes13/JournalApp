import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { noteLogout } from './notes';
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password ) => {
    return (dispatch) => {
        dispatch( startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(
                    login(user.multiFactor.user.uid,user.multiFactor.user.displayName)
                )
                dispatch( finishLoading());
            })
            .catch(e => {
                //console.log(e);
                dispatch( finishLoading());
                Swal.fire('Error', 'Credenciales Incorrectas', 'error')
            })
        
        //dispatch(login(123,'pedro'));
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
            .catch(e => {
                console.log(e);
            })
    }
}



export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user })  => {

                await user.updateProfile({displayName:name});
                //console.log(user);
                dispatch(
                    login(user.multiFactor.user.uid,user.multiFactor.user.displayName)
                )
            })
            .catch(e => {
                //console.log(e);
                Swal.fire('Error', 'Problemas con registro', 'error')
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


export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout());
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
});