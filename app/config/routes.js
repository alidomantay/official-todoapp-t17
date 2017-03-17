import React from 'react';
import ReactRouter, { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './../components/App';
import SignupContainer from '../container/SignupContainer';
import LoginContainer from '../container/LoginContainer';
import TodoContainer from '../container/TodoContainer';
//import ToDoContainer from '../container/ToDoContainer';

var routes = (
    <Router history={browserHistory} >
        <Route path='/' component={App}>
            <IndexRoute component={LoginContainer} />
            <Route path='login/rdr' component={LoginContainer} />
            <Route path ='signup' component={SignupContainer} />
            <Route path ='todos' component={TodoContainer} />
            <Route path ='todos/:mode' component={TodoContainer} />
        </Route>
    </Router>
);

export default routes;

//    <Router path='todos' component={TodoContainer} />/