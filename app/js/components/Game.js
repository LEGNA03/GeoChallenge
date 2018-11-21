import React from "react";
import flags from "./Flags";
import Score from "./Score";
import Time from "./Time";
import GameOver from "./GameOver";

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
            });
        } else {
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

    run = () => {
        if(!this.state.win && this.state.arrCountries.length >= 1) {
            this.setState({
                time: 10,
            });
            this.interval = setInterval(() => {
                if (this.state.time >= 1) {
                    this.setState({
                        time: this.state.time - 1,
                    });
                } else {
                    clearInterval(this.interval);
                    this.setState({
                        lifes: this.state.lifes - 1,
                        streak: 0,
                        time: 10
                    }, () => {
                        this.run();
                    });
                    this.getRandomFlags()
                }
            }, 1000);
        }
    };

    componentDidMount() {
        this.getRandomFlags();
        this.run();

    }

    clickHandler = (flag) => {
            clearInterval(this.interval);
            if (flag.name === this.state.correctCountry) {
                this.getRandomFlags();
                this.run();
                if(!this.state.win){
                    this.setState({
                        streak: this.state.streak + 1,
                    }, () => {
                        this.setState({
                            score: this.state.score + (10 * this.state.streak)
                        })
                    });
                }
            } else {
                clearInterval(this.interval);
                this.run();
                this.getRandomFlags();
                if(!this.state.win){
                    this.setState({
                        streak: 0,
                        lifes: this.state.lifes - 1

                    });
                }
            }
    };

    render(){
        return !this.state.win && this.state.lifes > 0 ?(
            <div className="conteiner">
                <div className="mainContent">
                    <Score score={this.state.score} streak={this.state.streak} lifes={this.state.lifes}/>
                    <Time time={this.state.time}/>
                    <div className="timeKeeper">
                        <div className="br"></div>
                    </div>
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
        ) : <GameOver win={this.state.win}/>
    }
}

export default Game;