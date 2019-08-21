import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import './index.sass';
import * as serviceWorker from './serviceWorker';

import endpoints from './instagram.config';

import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import About from './components/About/About';
import Analytics from './components/Analytics/Analytics';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

class App extends Component{
    constructor(){
        super();
        //let token = window.location.href.split('=')[1];
        let accessTokens = {
            rachael: `332134287.9127845.66991ecf3e4641a9b07b2e96007c0de1`,
            michael: `14239172.9127845.3c45e3dd3d60444b90ba993592248d21`

        }
        this.state = {
            token: accessTokens.rachael,
            loading: false,
            userPosts: undefined,
            userInfo: undefined
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserPosts = this.getUserPosts.bind(this);
    }
    getUserInfo(){
        fetch(endpoints.userInfo + this.state.token)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    userInfo: {
                            userName: resJSON.data.username,
                            profilePicture: resJSON.data.profile_picture,
                            fullName: resJSON.data.full_name,
                            bio: resJSON.data.bio,
                            website: resJSON.data.website,
                            followers: resJSON.data.counts.followed_by,
                            follows: resJSON.data.counts.follows,
                            mediaCount: resJSON.data.counts.media
                    }
                })
            })
            .then(() => {
                this.getUserPosts()
            })
    }
    getUserPosts(){
        fetch(endpoints.userPosts + this.state.token)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    userPosts: resJSON.data.map(post => {
                            if (post['type'] === 'image' || post['type'] === 'carousel') {
                                return ({
                                    postDate: new Date(post['created_time'] * 1000),
                                    postUrl: post['images']['standard_resolution']['url'],
                                    postLikes: post['likes']['count'],
                                    postCaption: post['caption']['text']
                                })
                            }
                        }).reverse()
                    })
                })
            .then(() => {
                this.setState({ loading: false });
            })
    }

    componentWillMount(){
        if(this.state.token){
            this.setState({
                loading: true 
            }, () => {
                this.getUserInfo();
            });
        }
    }
    render(){
        return(
            <BrowserRouter>
                <div className="app-component">
                    <Header
                        loading={this.state.loading}
                        isLoggedIn={this.state.token ? true : false }
                        userInfo={this.state.userInfo}
                    />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={(props) => 
                                <Home {...props}/>
                            }
                        />
                        <Route
                            path="/analytics"
                            component={ (props) =>
                                <Analytics {...props}
                                    loading={this.state.loading}
                                    isLoggedIn={this.state.token ? true : false }
                                    userPosts={this.state.userPosts} 
                                />
                            }

                        />
                        <Route
                            path="/about"
                            component={ (props) =>  
                                <About {...props}/>
                            }
                        />
                        <Route
                            component={NotFound}
                        />
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>  
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
