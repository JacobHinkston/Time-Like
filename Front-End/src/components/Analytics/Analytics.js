import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import { Route, Link, Switch} from 'react-router-dom';

import NotFound from '../NotFound/NotFound';
import endpoints from '../../instagram.config';

import Graphs from './Graphs/Graphs';
import MiscTools from './MiscTools/MiscTools'
import './Analytics.sass'
export default class Analytics extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <main className="analytics-component">
                {
                    this.props.loading ? (
                        <div className="loading">
                            <img 
                                src="/assets/spinner.gif"
                                alt="#"
                            />
                            <h1>Please wait...</h1>
                        </div>
                    ) : (
                        this.props.isLoggedIn ? (
                            <div className="analytics-component-browser row">
                                <aside>
                                    <MenuList>
                                        <h3>
                                            Graphs
                                        </h3>
                                        <MenuItem
                                            className={window.location.pathname.split("/")[3] === "overtime" ? "selected" : ""}
                                        >
                                            <Link 
                                                to="/analytics/graphs/overtime"
                                            >
                                                Over Time
                                            </Link> 
                                        </MenuItem>
                                        <MenuItem
                                            className={window.location.pathname.split("/")[3] === "postedday" ? "selected" : ""}
                                        >
                                            <Link 
                                                to="/analytics/graphs/postedday"
                                            >
                                                Posted Day
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                            className={window.location.pathname.split("/")[3] === "postedtime" ? "selected" : ""}
                                        >
                                            <Link 
                                                to="/analytics/graphs/postedtime"
                                            >
                                                Posted Time
                                            </Link>
                                        </MenuItem>
                                    </MenuList>
                                    <Divider/>
                                    <MenuList>
                                        <h3>
                                            Misc Tools
                                        </h3>
                                        <MenuItem
                                            className={window.location.pathname.split("/")[3] === "mostliked" ? "selected" : ""}
                                        >
                                            <Link 
                                                to="/analytics/misc/mostliked"
                                            >
                                                Most Liked Post
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                            className={window.location.pathname.split("/")[3] === "lamedetector" ? "selected" : ""}
                                        >
                                            <Link 
                                                to="/analytics/misc/lamedetector"
                                            >
                                                Lame Detector
                                            </Link>
                                        </MenuItem>
                                    </MenuList>
                                </aside>
                                <section>
                                    {
                                        this.props.userPosts ? (
                                            <React.Fragment>
                                                {
                                                    window.location.pathname.split("/")[3] === undefined ? (
                                                        <div className="analytics-summary">
                                                            <h2
                                                                className="analytics-header"
                                                            >
                                                                Welcome, {this.props.userInfo.fullName}!
                                                            </h2>
                                                            <div className="row center-y center-x">
                                                                <div className="col-1 row center-x center-y">
                                                                    <img 
                                                                        src={this.props.userInfo.profilePicture}
                                                                        alt="/assets/spinner.gif"
                                                                    />
                                                                </div>
                                                                <div className="col-2 col">
                                                                    <div>
                                                                        <h4>
                                                                            {this.props.userInfo.userName}
                                                                        </h4>
                                                                    </div>
                                                                    <div className="row">
                                                                        <p>
                                                                             
                                                                        </p>
                                                                        <p>

                                                                        </p>
                                                                        <p>
                                                                            
                                                                        </p>
                                                                    </div>
                                                                    <div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Switch>
                                                            <Route
                                                                path="/analytics/graphs"
                                                                component={(props) =>

                                                                    <Graphs
                                                                        {...props}
                                                                        userPosts={this.props.userPosts}
                                                                    />
                                                                }
                                                            />
                                                            <Route
                                                                path="/analytics/misc"
                                                                component={(props) => 
                                                                    <MiscTools
                                                                        {...props}
                                                                        userPosts={this.props.userPosts}
                                                                    />
                                                                }
                                                            />
                                                            <Route
                                                                component={NotFound}
                                                            />
                                                        </Switch>
                                                    )
                                                }
                                            </React.Fragment>
                                        ) : (
                                            <div
                                                className = "loading col-1 user-btn row center-x center -y"
                                            >
                                                <img
                                                    src="/assets/analytics/graph-loading.gif"
                                                    alt="#"
                                                />
                                            </div>
                                        )
                                    }
                                </section>
                            </div>
                        ) : (
                            <h1>You are not logged in</h1>
                            //TODO: 
                        )
                    )
                }
            </main>
        )
    }
}
