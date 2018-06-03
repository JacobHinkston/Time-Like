import React, { Component } from 'react'
import MostLikedPost from './MostLikedPost.js'
import Graph_LikesOverTime from './Graphs/Graph_LikesOverTime.js'
import Graph_LikesOnDay from './Graphs/Graph_LikesOnDay.js'
import Graph_LikesAtTime from './Graphs/Graph_LikesAtTime.js'
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfo: props.userInfo,
            userPosts: props.userPosts,
            parsedUserData: undefined
        }
        this.parseUserData = this.parseUserData.bind(this)
    }
    parseUserData(){
        var media = this.state.userInfo['data']['counts']['media']!==0
        if(media){
            var parsedUserData = this.state.userPosts['data'].map(post => {
                if (post['type'] === 'image' || post['type'] === 'carousel') {
                    return ({
                        postDate: new Date(post['created_time'] * 1000),
                        postUrl: post['images']['standard_resolution']['url'],
                        postLikes: post['likes']['count'],
                        postCaption: post['caption']['text']
                    })
                }
            }).reverse()
            this.setState({parsedUserData: parsedUserData})
        }
    }
    componentDidMount(){
        this.parseUserData()
    }
    render(props){
        var graphData, mostLikedPost
        if(this.state.parsedUserData){
            var parsedUserData = this.state.parsedUserData.map(post => {
                return({
                    postDate: post.postDate,
                    postLikes: post.postLikes
                })
            })
            graphData= (
                <section className='graph-data'>
                    <Graph_LikesOverTime parsedUserData={parsedUserData}/>
                    <Graph_LikesOnDay parsedUserData={parsedUserData}/>
                    <Graph_LikesAtTime parsedUserData={parsedUserData}/>
                </section>
            )
            mostLikedPost = (
                <MostLikedPost 
                    parsedUserData={this.state.parsedUserData}
                    userInfo={this.state.userInfo}
                />
            )
        }else{
            mostLikedPost = (<h3 className='error'>You dont have a most liked post!</h3>)
            graphData = (<h3 className='error'>No data to analyze, </h3>)
        }
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
                {mostLikedPost}
                {graphData}
                
            </section>
        )
    }

}
export default Home