import React from "react";
import flags from "./Flags";
import Score from "./Score";
import Time from "./Time";

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            arrCountries: ["Afganistan", "Albania", "Algieria", "Andora", "Angola", "Antigua i Barbuda", "Arabia Saudyjska",
                "Argentyna", "Armenia", "Australia", "Austria", "Azerbejdżan"],
            finalFlags: [],
            correctCountry: "",
            score: 0,
            streak: 0,
            lifes: 3,
            time: 10,
            win: false,
            gameOver: false
        }
    }

    getRandomFlags = () => {
        if(!this.state.win && this.state.arrCountries.length >= 1) {
            const arrayToRandom = [...flags];
            const randomIndex = Math.floor(Math.random() * this.state.arrCountries.length);
            const randomCountry = this.state.arrCountries[randomIndex];
            const correctFlagIndex = arrayToRandom.findIndex(element => element.name === randomCountry);
            const flagsToDisplay = [arrayToRandom[correctFlagIndex]];
            arrayToRandom.splice(correctFlagIndex, 1);

            for (let i = 0; i < 3; i++) {
                const randomFlagIndex = this.getRandomNumber(arrayToRandom.length, correctFlagIndex);
                flagsToDisplay.push(arrayToRandom[randomFlagIndex]);
                arrayToRandom.splice(randomFlagIndex, 1);
            }

            const finalSetOfFlags = [];
            for (let j = 0; j < 4; j++) {
                const randomFlagIndex = Math.floor(Math.random() * flagsToDisplay.length);
                const randomFlag = flagsToDisplay[randomFlagIndex];
                finalSetOfFlags.push(randomFlag);
                flagsToDisplay.splice(randomFlagIndex, 1);
            }

            this.state.arrCountries.splice(randomIndex, 1);

            this.setState({
                finalFlags: finalSetOfFlags,
                correctCountry: randomCountry,
                arrCountries: this.state.arrCountries
            })
        } else {
            console.log("Gratuluje");
            this.setState({
                win: true
            });
        }

    };

    getRandomNumber(max, exclude = null){
        const randomNumber = Math.floor(Math.random() * max);
        if(randomNumber === exclude){
            return this.getRandomNumber(max, exclude);
        }
        return randomNumber;
    }

    componentDidMount() {
        this.getRandomFlags()
    }

    clickHandler = (flag) => {
        console.log(this.state.arrCountries.length);
        if(this.state.arrCountries.length >= 0) {
            if (flag.name === this.state.correctCountry) {
                console.log("brawo");
                this.getRandomFlags();
                if(!this.state.win){
                    this.setState({
                        streak: this.state.streak + 1,
                        score: this.state.score + (10 * (1 + this.state.streak))
                    });
                }
            } else {
                console.log("źle");
                this.getRandomFlags();
                if(!this.state.win){
                    this.setState({
                        streak: 0,
                        lifes: this.state.lifes - 1
                    });
                }
            }
        }
    };

    render(){
        return this.state.lifes > 0 ? (
            <div className="conteiner">
                <div className="mainContent">
                    <Score score={this.state.score} streak={this.state.streak} lifes={this.state.lifes}/>
                    <Time time={this.state.time}/>
                    <div className="flags">
                        <h1>{this.state.correctCountry}</h1>
                        <div>
                            {
                                this.state.finalFlags.map((flag, index) => {
                                    return <img className="flag" key={index} src={flag.img} alt="" onClick={() =>{
                                        this.clickHandler(flag)
                                    }
                                    }/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        ) : <h1>Game Over</h1>
    }
}

export default Game;

// : <GameOver win={this.state.win}/>;