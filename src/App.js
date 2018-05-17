import React, { Component } from 'react';
import './App.css';

import Header from './components/Header.js'
import Main from './components/Main.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      display:"Home"
    }
    this.changeDisplay = this.changeDisplay.bind(this)
  }
  changeDisplay(link){
    this.setState({
      display: link
    })
  }
  render() {
    return (
      <div className="App">
        <Header changeDisplay={this.changeDisplay}/>
        <Main display={this.state.display}/>
      </div>
    );
  }
}

export default App;
