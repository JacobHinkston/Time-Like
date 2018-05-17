import React, { Component } from 'react'

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfo: props.userInfo,
            userPosts: props.userPosts

        }
    }
    render(){
        return(
            <h1></h1>
        )
    }

}
export default Home