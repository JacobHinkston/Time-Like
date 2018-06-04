import React, { Component } from 'react'
import About from './About.js'
import Home from './Home.js'

import connection from '../assets/connection.js'
import loadingPic from '../assets/loading.gif'
class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn: props.loggedIn,
            accessToken: props.accessToken,
            userInfo: {},
            userPosts: {},
            dataIsLoaded: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event){
        window.location.href = connection.ig_connection_url
    }
    
    componentDidMount(){
        if(this.state.loggedIn){
            const accessToken = window.location.href.split('=')[1]
            fetch(connection.ig_userInfo_url + accessToken)
                .then(userInfo => userInfo.json())
                .then(userInfoJSON => {
                    this.setState({
                        userInfo: userInfoJSON
                    })
                    fetch(connection.ig_userPosts_url + accessToken)
                        .then(userPosts => userPosts.json())
                        .then(userPostsJSON => {
                            this.setState({
                                userPosts: userPostsJSON,
                                dataIsLoaded: true
                            })
                        })
                })
            
        }
    }

    render(props){
        const dataIsLoaded = this.state.dataIsLoaded
        if(this.props.display === "Home" && dataIsLoaded){
            return(
            <Home
                userInfo={this.state.userInfo}
                userPosts={this.state.userPosts}
            />
        )}
        else if(this.props.display === "About"){ return(
            <About/>
        )}
        else if(!this.state.loggedIn){ return(
            <section className='section-not-logged-in'>
                <h3>You dont apear to be logged in to instagram on this device.</h3>
                <button onClick={this.handleClick}>Login</button>
            </section>
        )}
        
        else{ return(
            <section className='section-loading'>
                <img src={loadingPic} alt='#'/>
            </section>
        )}


    }
}
export default Main