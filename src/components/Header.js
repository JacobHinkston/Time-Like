import React, { Component } from 'react'
import headerPic from '../assets/likes.gif'
import connection from '../assets/connection.js'
class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            display: ""
        }
        this.displayLogin = this.displayLogin.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    displayLogin(){
        if(this.state.loggedIn){
            alert("READ! \n\n Instagram has send you a cookie that has authenticated this computer; \n To sign into another account you have to clear the instagram api cookies in your browsers settings. \n")
        }
    }
    handleClick(event){
        event.preventDefault()
        const link = event.target.textContent
        this.setState({
            display: link
        })
        this.props.changeDisplay(link)
    }
    componentDidMount(){
        if(window.location.href.indexOf('=') !== -1){
            this.setState({
                loggedIn: true
            })
        }else{
            this.setState({
                loggedIn: false
            })
        }
    }
    render(props){
        return(
            <header>
                <section>
                    <h1>Time Like</h1>
                    <img 
                        src={headerPic} 
                        alt="#"
                    ></img>
                </section>
                <nav>
                    <a
                        href="#"
                        onClick={this.handleClick}
                    >Home</a>
                    <a
                        href="#"
                        onClick={this.handleClick}
                    >About</a>
                    
                    <a
                        href={connection.ig_connection_url}
                        onClick={this.displayLogin}
                    >{(
                        this.state.loggedIn?
                        "Sign Out":
                        "Login"
                    )}</a>
                </nav>
            </header>
        )
    }
}
export default Header