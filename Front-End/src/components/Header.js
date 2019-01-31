import React, { Component } from 'react'
import headerPic from '../assets/timeLike.png'
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
        if (this.state.loggedIn){
            alert('You will now be redirected to instagrams website where you can loggout. \n Once you logout, revist this site to log into another account')
            window.location.href = connection.ig_url
        }else{
            window.location.href = connection.ig_connection_url
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
                    <img 
                        src={headerPic} 
                        alt="#"
                    ></img>
                    <h1> Time Like </h1>
                    
                </section>
                <nav>
                    <button 
                        className='nav-button'
                        onClick={this.handleClick}
                    >Home</button>
                    <button
                        className='nav-button'
                        onClick={this.handleClick}
                    >About</button>
                    <button 
                        className='nav-button'
                        onClick={this.displayLogin}
                    >
                    {(
                        this.state.loggedIn?
                        "Logout":
                        "Login"
                    )}
                    </button>
                </nav>
                
                
            </header>
        )
    }
}
export default Header