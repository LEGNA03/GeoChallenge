import React, { Component } from 'react';
import {HashRouter, Route, Link, Switch, NavLink,} from 'react-router-dom';
import StartingGameScreen from "./StartingGameScreen";
import Game from "./Game";

class App extends Component{
    render(){
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path='/' component={StartingGameScreen}/>
                        <Route exact path='/game' component={Game}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;