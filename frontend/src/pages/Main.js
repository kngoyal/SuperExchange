import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Portal from './Portal';

export default function Main() {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/portal' component={Portal}></Route>
        </Switch>
    );
}
