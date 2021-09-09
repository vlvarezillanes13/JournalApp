import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRouters } from './PublicRouters';
import { PrivateRouters } from './PrivateRouters';
import { loadNotes } from '../helpers/loadNotes';
import { setNote } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async( user ) => {
            if( user?.multiFactor.user.uid){
                dispatch(login(user.multiFactor.user.uid, user.multiFactor.user.displayName));
                setIsLoggedIn(true);

                const notes = await loadNotes(user.multiFactor.user.uid)
                dispatch( setNote(notes));
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [ dispatch, setChecking ])


    if (checking){
        return(
            <h1>Wait...</h1>
        )
    }

    return (
        
        <Router>
            <Switch>
                <PublicRouters
                    path="/auth" 
                    component={ AuthRouter } 
                    isAuthenticated= { isLoggedIn } 
                />

                <PrivateRouters
                    exact 
                    path="/" 
                    component={ JournalScreen } 
                    isAuthenticated= { isLoggedIn } 
                />

                <Redirect to='/auth/login' />
            </Switch>
        </Router>

    )
}
