import React from "react";

class GameOver extends React.Component{
    render(){
        return !this.props.win ? (
            <h1>Game Over</h1>
        ) : <h1>WOW odgadłeś wszystkie flagi</h1>
    }
}

export default GameOver;