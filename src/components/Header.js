import React, { Component } from 'react'
import headerPic from '../assets/likes.gif'
import connection from '../assets/connection.js'
class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn: props.loggedIn,
            accessToken: props.accessToken,
        }
        this.displayLogin = this.displayLogin.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    displayLogin(){
        console.log(this.state.loggedIn)
        if (this.state.loggedIn){
            alert('You will now be redirected to instagrams website where you can loggout.')
        }
    }
    handleClick(event){
        event.preventDefault()
        const link = event.target.textContent
        this.props.changeDisplay(link)
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
                        href={(
                            this.state.loggedIn?
                            "https://www.instagram.com":
                            connection.ig_connection_url
                        )}
                        onClick={this.displayLogin}
                    >
                    {(
                        this.state.loggedIn?
                        "Sign Out":
                        "Login"
                    )}
                    </a>
                </nav>
                
                
            </header>
        )
    }
}
export default Header