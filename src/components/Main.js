import React, { Component } from 'react'
import conections from '../assets/connection.js'
class Main extends Component{
    render(props){
        console.log(this.props.display +"link")
        if(this.props.display === "Home"){ 
            return(
                <h1> HOME </h1>
            );
        }

        else if(this.props.display === "About"){ 
            return(
                <h1> ABOUT </h1>
            );
        }

        else{
            return(
                <h1> Oops, something went wrong </h1>
            )
        }


    }
}
export default Main