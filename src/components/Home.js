import React, { Component } from 'react'
import GraphTimeLike from './Graphs/GraphTimeLike.js'
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfo: props.userInfo,
            userPosts: props.userPosts

        }
        this.parseUserPosts = this.parseUserPosts.bind(this)
    }
    parseUserPosts(){
        return this.state.userPosts['data'].map(post => {
            if (post['type'] === 'image' || post['type'] === 'carousel') {
                return ({
                    postDate: new Date(post['created_time'] * 1000),
                    postUrl: post['images']['standard_resolution']['url'],
                    postLikes: post['likes']['count']
                })
            }
        }).reverse()
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
                <section className='graph-data'>
                    <GraphTimeLike 
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

/*

*/