import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../journal/JournalScreen';

export const AppRouter = () => {
    return (
        <div className='auth__main'>
            <div className='auth_box-container'>
                <Router>
                    <Switch>
                        <Route path="/auth" component={ AuthRouter } />

                        <Route exact path="/" component={ JournalScreen } />

                        <Redirect to='/auth/login' />
                    </Switch>
                </Router>
            </div>
        </div>
    )
}
