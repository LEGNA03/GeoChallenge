import React from "react";

class Score extends React.Component{
    render(){
        return (
            <div className="score">
                <div className="result">
                    <p>Score: {this.props.score}</p>
                </div>
                <div className="result">
                    <p>Streak: {this.props.streak}</p>
                </div>
                <div className="result">
                    <p>Lifes: {this.props.lifes}</p>
                </div>
            </div>
        );
    }
}

export default Score;