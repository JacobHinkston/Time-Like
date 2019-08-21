import React, { Component } from 'react'
import { Route, Link, Switch} from 'react-router-dom';
import './Graphs.sass'
import GraphLikesAtTime from './GraphLikesAtTime';
import GraphLikesOnDay from './GraphLikesOnDay';
import GraphLikesOverTime from './GraphLikesOverTime'
import NotFound from '../../NotFound/NotFound';
export default class Graphs extends Component {
    constructor(props){
        super(props);
        this.state = {
            userPosts: props.userPosts
        };
    }
    componentWillMount(){

    }
    render() {
        return (
            <div className="graphs-component row center-x">
                <Switch>
                    <Route
                        path="/analytics/graphs/overtime"
                        component={(props) =>
                            <GraphLikesOverTime
                                {...props}
                                userPosts={this.state.userPosts}
                            />
                        }
                    />
                    <Route
                        path="/analytics/graphs/postedday"
                        component={(props) =>
                           <GraphLikesOnDay
                                {...props}
                                userPosts = {
                                    this.state.userPosts.map(post => {
                                        return({
                                            postDay: post.postDate.getDay(),
                                            postLikes: post.postLikes
                                        })
                                    }).sort((post1, post2) => {
                                        return(post1.postDay - post2.postDay)
                                    })
                                }
                           />
                        }
                    />
                    <Route
                        path="/analytics/graphs/postedtime"
                        component={(props) => 
                            <GraphLikesAtTime
                                {...props}
                                userPosts={
                                    this.state.userPosts.map(post => {
                                    return({
                                        postTime: post.postDate.getHours(),
                                        postLikes: post.postLikes
                                    })
                                }).sort((post1, post2) => {
                                    return(post1.postTime - post2.postTime)
                                })
                                }
                            />
                        }
                    />
                    <Route
                        component={NotFound}
                    />
                    
                </Switch>
            </div>
        )
    }
}
