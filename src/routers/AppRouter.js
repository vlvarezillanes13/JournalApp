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


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if( user?.multiFactor.user.uid){
                dispatch(login(user.multiFactor.user.uid, user.multiFactor.user.displayName));
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [ dispatch, setChecking ])


    if (checking){
        return(
            <h1>Espere...</h1>
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
