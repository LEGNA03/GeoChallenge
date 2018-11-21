import React from "react";

class Time extends React.Component{
    render(){
        return (
            <div className="timeBox">
                <h1>{this.props.time}</h1>
            </div>
        );
    }
}

export default Time;