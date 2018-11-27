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
                "Argentyna", "Armenia", "Australia", "Austria", "Azerbejdżan", "Bahamy", "Bahrajn", "Bangladesz", "Barbados",
                "Belgia", "Belize", "Benin", "Bhutan", "Białoruś", "Boliwia", "Botswana", "Bośnia i Hercegowina", "Brazylia",
                "Brunei", "Burkina Faso", "Burundi", "Bułgaria", "Chile", "Chiny", "Chorwacja", "Cypr", "Czad", "Czarnogóra",
                "Czechy", "Dania", "Demokratyczna Republika Konga", "Dominika", "Dominikana", "Dżibuti", "Egipt", "Ekwador",
                "Erytrea", "Estonia", "Etiopia", "Fidżi", "Filipiny", "Finlandia", "Francja", "Gabon", "Gambia", "Ghana",
                "Grecja", "Grenada", "Gruzja", "Gujana", "Gwatemala", "Gwinea", "Gwinea Bissau", "Gwinea Równikowa", "Haiti",
                "Hiszpania", "Holandia", "Honduras", "Indie", "Indonezja", "Irak", "Iran", "Irlandia", "Islandia", "Izrael",
                "Jamajka", "Japonia", "Jemen", "Jordania", "Kambodża", "Kamerun", "Kanada", "Katar", "Kazachstan", "Kenia",
                "Kirgistan", "Kiribati", "Kolumbia", "Komory", "Kongo", "Korea Południowa", "Korea Północna", "Kosowo",
                "Kostaryka", "Kuba", "Kuwejt", "Laos", "Lesotho", "Liban", "Liberia", "Libia", "Liechtenstein", "Litwa",
                "Luksemburg", "Łotwa", "Macedonia", "Madagaskar", "Malawi", "Malediwy", "Malezja", "Mali", "Malta", "Maroko",
                "Mauretania", "Mauritius", "Meksyk", "Mikronezja", "Mjanma", "Monako", "Mongolia", "Mozambik", "Mołdawia",
                "Namibia", "Nauru", "Nepal", "Niemcy", "Niger", "Nigeria", "Nikaragua", "Norwegia", "Nowa Zelandia", "Oman",
                "Pakistan", "Palau", "Panama", "Papua Nowa Gwinea", "Paragwaj", "Peru", "Polska", "Portugalia",
                "Republika Południowej Afryki", "Republika Zielonego Przylądka", "Republika Środkowoafrykańska", "Rosja",
                "Rumunia", "Rwanda", "Saint Kitts i Nevis", "Saint Lucia", "Saint Vincent i Grenadyny", "Salwador", "Samoa",
                "San Marino", "Senegal", "Serbia", "Seszele", "Sierra Leone", "Singapur", "Somalia", "Sri Lanka",
                "Stany Zjednoczone", "Suazi", "Sudan", "Sudan Południowy", "Surinam", "Syria", "Szwajcaria", "Szwecja",
                "Słowacja", "Słowenia", "Tadżykistan", "Tajlandia", "Tanzania", "Timor Wschodni", "Togo", "Tonga",
                "Trynidad i Tabago", "Tunezja", "Turcja", "Turkmenistan", "Tuvalu", "Uganda", "Ukraina", "Urugwaj", "Uzbekistan",
                "Vanuatu", "Watykan", "Wenezuela", "Wielka Brytania", "Wietnam", "Wybrzeże Kości Słoniowej", "Wyspy Marshalla",
                "Wyspy Salomona", "Wyspy Świętego Tomasza i Książęca", "Węgry", "Włochy", "Zambia", "Zimbabwe",
                "Zjednoczone Emiraty Arabskie"],
            finalFlags: [],
            correctCountry: "",
            score: 0,
            streak: 0,
            lifes: 3,
            time: 10,
            win: false
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
                const randomFlagIndex = Math.floor(Math.random() * (flagsToDisplay.length-1));
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
            }, () => {
                clearInterval(this.interval);
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
                        if(this.state.lifes === 0){
                            clearInterval(this.interval);
                        }else{
                            this.run();
                        }
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

    componentWillUnmount() {
        clearInterval(this.interval);
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
                this.run();
                this.getRandomFlags();
                if(!this.state.win){
                    this.setState({
                        streak: 0,
                        lifes: this.state.lifes - 1
                    }, () => {
                        if(this.state.lifes === 0){
                            clearInterval(this.interval);
                        }
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
                        {
                            this.state.time > 0 && <div style={{
                                width: `${((this.state.time * 10))}%`,
                                height: '30px',
                                backgroundColor: 'green'
                            }}></div>
                        }
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
        ) : <GameOver win={this.state.win} score={this.state.score}/>
    }
}

export default Game;