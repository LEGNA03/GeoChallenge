import React from "react";
import {Link} from 'react-router-dom';

class StartingGameScreen extends React.Component{
    render(){
        return (
            <div className="conteiner">
                <div className="mainBox">
                    <h1>Geo Chalange</h1>
                    <Link to="/game">
                        <button>START GAME</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default StartingGameScreen;