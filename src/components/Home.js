import React, { Component } from 'react'
import MostLikedPost from './MostLikedPost.js'
import Graph_LikesOverTime from './Graphs/Graph_LikesOverTime.js'
import Graph_LikesOnDay from './Graphs/Graph_LikesOnDay.js'
import Graph_LikesAtTime from './Graphs/Graph_LikesAtTime.js'
import HowLame from './HowLame.js'
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfo: props.userInfo,
            userPosts: props.userPosts,
            userPostsLen: props.userPosts['data'].length,
            parsedUserData: undefined,
            bestPostTime: undefined,
            bestPostDay: undefined
        }
        this.parseUserData = this.parseUserData.bind(this)
    }
    parseUserData(){
        var media = this.state.userInfo['data']['counts']['media']!==0
        if(media){
            var parsedUserData = this.state.userPosts['data'].map(post => {
                if (post['type'] === 'image' || post['type'] === 'carousel') {
                    var postCaptionText = post['caption']
                    if(postCaptionText == null) postCaptionText="/NO CAPTION/"
                    else postCaptionText = post['caption']['text']
                    return ({
                        postDate: new Date(post['created_time'] * 1000),
                        postUrl: post['images']['standard_resolution']['url'],
                        postLikes: post['likes']['count'],
                        postCaption: post['caption']['text'],
                        userLikedOwnPost: post["user_has_liked"]
                    })
                }
            }).reverse().filter(post =>{ return(post !== undefined) })
            this.setState({parsedUserData: parsedUserData})
        }
    }
    componentDidMount(){
        this.parseUserData()
    }
    render(props){
        var graphData, mostLikedPost, howLame
        var recentPosts, recentPostsError=undefined, recentPostsWarning=undefined, errorPosts=0
        if(this.state.parsedUserData){
            var parsedUserData = this.state.parsedUserData.map(post => {
                return({
                    postDate: post.postDate,
                    postLikes: post.postLikes,
                    userLikedOwnPost: post.userLikedOwnPost
                })
            })
            graphData= (
                <section className='graph-data'>
                    <Graph_LikesOverTime parsedUserData={parsedUserData}/>
                    <Graph_LikesOnDay 
                        parsedUserData={
                            parsedUserData.map(post => {
                                return({
                                    postDay: post.postDate.getDay(),
                                    postLikes: post.postLikes
                                })
                            }).sort((post1, post2) => {
                                return(post1.postDay - post2.postDay)
                            })
                        }
                    />
                    <Graph_LikesAtTime 
                        parsedUserData={
                            parsedUserData.map(post => {
                                return({
                                    postTime: post.postDate.getHours(),
                                    postLikes: post.postLikes
                                })
                            }).sort((post1, post2) => {
                                return(post1.postTime - post2.postTime)
                            })
                        }
                    />
                </section>
            )
            if(this.state.userInfo['data']['counts']['media'] > 20) recentPostsWarning=(
                <h5 className='parsed-data-warning'>Some data cannot be analyzed; Instagram's API only allows data retreival for the last 20 posts of any user...</h5>
            )
            if(this.state.userPostsLen > this.state.parsedUserData.length){
                errorPosts = (this.state.userPostsLen - this.state.parsedUserData.length)
                recentPostsError=(
                    <h5 className='parsed-data-error'> {errorPosts} of your posts was not able to be retreived from instagram.</h5>
                )
            }
            recentPosts = (
                <div className='data-recent'>
                    <h4>Data from the last {this.state.parsedUserData.length} posts.</h4>
                    {recentPostsWarning?recentPostsWarning:<div></div>}
                    {recentPostsError?recentPostsError:<div></div>}
                </div>
            )
            mostLikedPost = (
                <MostLikedPost 
                    parsedUserData={this.state.parsedUserData}
                    userInfo={this.state.userInfo}
                />
            )
            howLame = (
                <HowLame
                    parsedUserData={parsedUserData}
                    userPostsLength={this.state.userInfo['data']['counts']['media']}
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
                {recentPosts}
                {mostLikedPost}
                {graphData}
                {howLame}
                
            </section>
        )
    }

}
export default Home