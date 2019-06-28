import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import endpoints from './instagram.config';
import Header from './components/Header/Header';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

class App extends Component{
    constructor(){
        super();
        let token = window.location.href.split('=')[1];
        this.state = {
            token,
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
                        return {
                            createdDate: post.created_time,
                            image: post.images.standard_resolution.url,
                            caption: post.caption.text
                        }
                    })
                });
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
                        <main>
                            {/* <Route
                                exact
                                path="/"
                                component={(props) => 
                                    <Home {...props}
                                        loggedIn={this.state.loggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/portal"
                                component={(props)=> 
                                    <Portal {...props}
                                        loggedIn={this.state.loggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/login"
                                component={(props) =>
                                    <Login {...props}
                                           updateSignin={this.updateSignin}
                                    />
                                }

                            /> */}
                            <Route
                                path="/about"
                                component={ (props) =>  
                                    <About {...props}/>
                                }
                            />
                        </main>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
            
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
