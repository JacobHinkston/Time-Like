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
import { userInfo, userPosts } from './demo.config.js';

import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import About from './components/About/About';
import Analytics from './components/Analytics/Analytics';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

class TimeLike extends Component{
    constructor(){
        super();
        //let token = window.location.href.split('=')[1];
        let accessTokens = {
            rachael: `332134287.9127845.66991ecf3e4641a9b07b2e96007c0de1`,
            michael: `14239172.9127845.3c45e3dd3d60444b90ba993592248d21`

        }
        this.state = {
            token: undefined,
            loading: false,
            userPosts: undefined,
            userInfo: undefined,
            demoMode: false
        };
    }
    setDemoMode = (demoMode) => {
        alert(`Demo mode is now ${demoMode? 'enabled.' : 'disabled'}`);
        this.setState({ 
            demoMode,
            userPosts: (
                demoMode ? 
                this.parseUserPosts(userPosts['data']) :
                undefined
            ),
            userInfo: (
                demoMode ?
                this.parseUserInfo(userInfo) :
                undefined
            )
        });
    }

    parseUserInfo = (json) => {
        return {
            userName: json.data.username,
            profilePicture: json.data.profile_picture,
            fullName: json.data.full_name,
            bio: json.data.bio,
            website: json.data.website,
            followers: json.data.counts.followed_by,
            follows: json.data.counts.follows,
            mediaCount: json.data.counts.media
        }
    } 
    
    parseUserPosts = (array) => {
        return array.map(post => {
            if (post['type'] === 'image' || post['type'] === 'carousel') {
                return ({
                    postDate: new Date(post['created_time'] * 1000),
                    postUrl: post['images']['standard_resolution']['url'],
                    thumbnail: post['images']['thumbnail']['url'],
                    postLikes: post['likes']['count'],
                    postCaption: post['caption']['text'],
                    likedOwnPost: post['user_has_liked']
                })
            }
        }).reverse()
    }

    getUserInfo = () => {
        fetch(endpoints.userInfo + this.state.token)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    userInfo: this.parseUserInfo(resJSON)
                })
            })
            .then(() => {
                this.getUserPosts();
            })
    }
    
    getUserPosts = () => {
        fetch( endpoints.userPosts + this.state.token )
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    userPosts: this.parseUserPosts(resJSON['data'])
                })
            })
            .then(() => {
                this.setState({ loading: false });
            })
    }

    componentWillMount(){
        if(this.state.demoMode){
            this.setState({
                
            })
        } else {
            if(this.state.token){
                this.setState({
                    loading: true 
                }, () => {
                    this.getUserInfo();
                });
            }
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
                    <div className={this.state.demoMode ? "demo-mode-header row center-y" : "hidden"}>
                        <p className="col-1">Demo mode is enabled.</p>
                        <div className="col-1 row right">
                            <button
                                onClick={() => {
                                    this.setDemoMode(false)
                                }}
                            >
                                Disable
                            </button>
                        </div>
                       
                    </div>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={(props) => 
                                <Home {...props}
                                    userInfo={this.state.userInfo}
                                    setDemoMode={this.setDemoMode}
                                    demoMode={this.state.demoMode}
                                    loading={this.state.loading}
                                    isLoggedIn={this.state.token ? true : false }
                                />
                            }
                        />
                        <Route
                            path="/analytics"
                            component={ (props) =>
                                <Analytics {...props}
                                    loading={this.state.loading}
                                    isLoggedIn={this.state.token ? true : false }
                                    userPosts={this.state.userPosts} 
                                    userInfo={this.state.userInfo}
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
ReactDOM.render(<TimeLike />, document.getElementById('root'));
serviceWorker.unregister();
