import React, { Component } from 'react'
class MostLikedPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            userInfo: props.userInfo,
            parsedUserData: props.parsedUserData,
            mostLikedPost: undefined
        }
        this.findMostLikedPost = this.findMostLikedPost.bind(this)
    }
    findMostLikedPost(){
        var parsedUserData = this.state.parsedUserData
        if(parsedUserData){
            var mostLikedPost = {
                postUrl: parsedUserData[0].postUrl,
                postLikes: parsedUserData[0].postLikes,
                postCaption: parsedUserData[0].postCaption
            }
            for (var i = 0; i < parsedUserData.length; i++) {
                if (parsedUserData[i].postLikes > mostLikedPost.postLikes) {
                    mostLikedPost.postUrl = parsedUserData[i].postUrl
                    mostLikedPost.postLikes = parsedUserData[i].postLikes
                    mostLikedPost.postCaption = parsedUserData[i].postCaption
                }
            }
            this.setState({mostLikedPost: mostLikedPost})
        }
        
    }
    componentDidMount(){
        this.findMostLikedPost()
       
    }

    render(){
        if(this.state.mostLikedPost){
            return(
                <section className = 'most-liked-post'>
                    <h2>Your most liked picture!</h2>
                    <section className='most-liked-picture'>
                        <img src={this.state.mostLikedPost.postUrl} alt='#'/>
                    </section>
                    <section className='most-liked-post-caption'>
                        <h3>{this.state.mostLikedPost.postLikes} <span className='bold'> likes</span></h3>
                        <p><span className='bold'> {this.state.userInfo['data']['username']}</span> {this.state.mostLikedPost.postCaption}</p>
                    </section>
                </section>
            )
        }else return (<h4 className='error'>You dont have a most liked post!</h4>)
        
    }
}
export default MostLikedPost