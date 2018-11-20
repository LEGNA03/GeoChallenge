import React from "react";

class Time extends React.Component{
    render(){
        return (
            <h1>{this.props.time}</h1>
        );
    }
}

export default Time;