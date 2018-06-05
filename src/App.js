import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import Main from './components/Main.js'
import Footer from './components/Footer.js'
import connection from './assets/connection.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      loggedIn: (connection.url.indexOf('=') !== -1 ? true : false),
      accessToken: (connection.url.indexOf('=') !== -1 ? connection.url.split('=')[1] : ""),
      display:"Home"
    }
    this.changeDisplay = this.changeDisplay.bind(this)
  }
  changeDisplay(link){ this.setState({
      display: link
    })
  }
  render(){
    return(
      <div className="App">
        <Header 
          changeDisplay={this.changeDisplay}
          loggedIn={this.state.loggedIn}
        />
        <Main 
          display={this.state.display}
          loggedIn={this.state.loggedIn}
          accessToken={this.state.accessToken}
        />
        <Footer/>
      </div>
    )
  }
}

export default App;
