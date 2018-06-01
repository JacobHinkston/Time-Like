import React, { Component } from 'react'
import GraphTimeLike from './Graphs/GraphTimeLike.js'
import GraphTimeODLike from './Graphs/GraphTimeODLikes.js'
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfo: props.userInfo,
            userPosts: props.userPosts,
            mostLikedPicture: {}
        }
        this.parseUserPosts = this.parseUserPosts.bind(this)
        this.findMostLikedPost = this.findMostLikedPost.bind(this)
    }
    parseUserPosts(){
        return this.state.userPosts['data'].map(post => {
            if (post['type'] === 'image' || post['type'] === 'carousel') {
                return ({
                    postDate: new Date(post['created_time'] * 1000),
                    postUrl: post['images']['standard_resolution']['url'],
                    postLikes: post['likes']['count'],
                    postCaption: post['caption']['text']
                })
            }
        }).reverse()
    }
    findMostLikedPost(){
        var parsedUserData = this.parseUserPosts()
        var mostLikedPicture = {
            postDate: parsedUserData[0].postDate,
            postUrl: parsedUserData[0].postUrl,
            postLikes: parsedUserData[0].postLikes,
            postCaption: parsedUserData[0].postCaption
        }
        for (var i = 0; i < parsedUserData.length; i++) {
            if (parsedUserData[i].postLikes > mostLikedPicture.postLikes) {
                mostLikedPicture.postDate = parsedUserData[i].postDate
                mostLikedPicture.postUrl = parsedUserData[i].postUrl
                mostLikedPicture.postLikes = parsedUserData[i].postLikes
                mostLikedPicture.postCaption = parsedUserData[i].postCaption
            }
        }
        this.setState({
            mostLikedPicture: mostLikedPicture
        })
    }
    componentDidMount(){
        this.findMostLikedPost()
    }

    render(props){
        
        return(
            <section className='component-home'>
                <h1>
                    {"Welcome, " + this.state.userInfo['data']['full_name'].split(' ')[0] + "!"}
                </h1>
                <section className='account-info'>
                    <div className='account-img'>
                        <img src={this.state.userInfo['data']['profile_picture']} alt='#'/>
                    </div>
                    <div className='account-headers'>
                        <h2>{this.state.userInfo['data']['username']}</h2>
                        <div className='followers'>
                            <p><span className='bold'> {this.state.userInfo['data']['counts']['media']}</span> Posts</p>
                            <p><span className='bold'> {this.state.userInfo['data']['counts']['followed_by']}</span> Followers</p>
                            <p><span className='bold'> {this.state.userInfo['data']['counts']['follows']}</span> Following</p>
                        </div>
                        <p><span className='bold'>{this.state.userInfo['data']['full_name']}</span>{this.state.userInfo['data']['bio']}</p>
                    </div>
                </section>
                <section className = 'most-liked-post'>
                    <h1>Your most liked picture!</h1>
                    <section className='most-liked-picture'>
                        <img src={this.state.mostLikedPicture.postUrl}/>
                    </section>
                    <section className='most-liked-post-caption'>
                        <h3>{this.state.mostLikedPicture.postLikes} <span className='bold'> likes</span></h3>
                        <p><span className='bold'> {this.state.userInfo['data']['username']}</span> {this.state.mostLikedPicture.postCaption}</p>
                    </section>
                    
                </section>
                <section className='graph-data'>
                    <GraphTimeLike 
                        userInfo={this.userInfo}
                        userPosts={this.userPosts}
                        parsedUserInfo={this.parseUserPosts()}
                    />
                    <GraphTimeODLike
                        userInfo={this.userInfo}
                        userPosts={this.userPosts}
                        parsedUserInfo={this.parseUserPosts()}
                    />
                </section>
            </section>
        )
    }

}
export default Home