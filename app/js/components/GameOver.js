import React from "react";

class GameOver extends React.Component{
    render(){
        return !this.props.win ? (
            <div className="gameOverBox">
                <div className="gameOver">
                    <h1>Game Over</h1>
                    <h2>Score: {this.props.score}</h2>
                </div>
            </div>

        ) :
        <div className="gameOverBox">
            <div className="gameOver">
                <h1>Nieźle odgadłeś wszystkie 195 flag</h1>
                <h2>Score: {this.props.score}</h2>
            </div>
        </div>
    }
}

export default GameOver;