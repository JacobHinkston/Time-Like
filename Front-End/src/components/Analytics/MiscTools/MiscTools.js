import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom';

import MostlikedPost from './MostLikedPost/MostLikedPost'
import LameDetector from './LameDetector/LameDetector'
import './MiscTools.sass';
import NotFound from '../../NotFound/NotFound';
export default class Misc extends Component {
    constructor(props){
        super(props);
        this.state = {
            userPosts: props.userPosts
        };
    }
    render() {
        return (
            <div className="misc-tools-component">
                <Switch>
                    <Route
                        path="/analytics/misc/mostliked"
                        component={(props) => 
                            <MostlikedPost
                                {...props}
                                userPosts={this.state.userPosts}
                            />
                        }
                    />
                    <Route
                        path="/analytics/misc/lamedetector"
                        component={(props) => 
                            <LameDetector
                                {...props}
                                userPosts={this.state.userPosts}
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
