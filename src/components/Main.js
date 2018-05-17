import React, { Component } from 'react'
import About from './About.js'
import Home from './Home.js'
import connection from '../assets/connection.js'
class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn: props.loggedIn,
            accessToken: undefined,
            userInfo: undefined,
            userPosts: undefined

        }
    }
    componentDidMount(){
        if(!this.state.accessToken && this.state.loggedIn){
            this.setState({
                accessToken: window.location.href.split('=')[1]
            })
        }
        if(this.state.loggedIn && !this.state.userInfo && !this.state.serPosts){

            fetch(connection.ig_userInfo_url + this.state.accessToken)
                .then(userInfo => userInfo.json())
                .then(userInfoJSON => {
                    this.setState({
                        userInfo: userInfoJSON
                    })
                })
            fetch(connection.ig_userPosts_url + this.state.accessToken)
                .then(userPosts => userPosts.json())
                .then(userPostsJSON => {
                    this.setState({
                        userPosts: userPostsJSON
                    })
                })
        }
    }
    render(props){
        if(this.props.display === "Home"){return(
            <Home
                userInfo={this.state.userInfo}
                userPosts={this.state.userPosts}
            />
        )}
        else if(this.props.display === "About"){ return(
            <About/>
        )}
        else{ return(
            <h1> Oops, something went wrong </h1>
        )}


    }
}
export default Main