import React, { Component } from 'react'
import './Home.sass';
import endpoints from '../../instagram.config';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <main className="home-component">
                <h2>Welcome to TimeLike!</h2>
                <div className={"sandbox-warning" + (!endpoints.ig_sandboxMode ? " hidden" : "")}>
                    <img
                        src="/assets/Home/warning.png"
                        alt="#"
                    />
                    <h3>
                        This app is still in sandbox mode, we are currently working on getting full access.
                    </h3>
                    <p>
                        This change affects the way users can gain access to TimeLike's functionality by the following:
                    </p>
                    <ul>
                        <li>
                            <p>
                                Users need to approve access by accepting an invite from TimeLike.
                            </p>
                        </li>
                        <li>
                            <p>
                                Users may only see data parsed from their 20 most recent posts.
                            </p>
                        </li>
                        <li>
                            <p>
                                TimeLike endpoints(API) for Instagram's data are limited, and some features may not be avaiable.
                            </p>
                        </li>
                    </ul>
                    {
                        !this.props.isLoggedIn ? (
                            <React.Fragment>
                                <p>
                                    If you want to use this app, follow the instructions:
                                </p>
                                <ol>
                                    <li>
                                        <p>
                                            <a href="mailto:jacobhinkston@gmail.com">Contact the administrator</a> and send your instagram username.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Visit <a href="https://www.instagram.com/developer/clients/sandbox_invites/">Instagram Sandbox Invites</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Fillout the form to Register for access to my application. All you need is my websites name, in this case: https://timelike.herokuapp.com/ .
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Accept 'timelike' invitation
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Revisit the website, and you will be prompted to authorize access to your data - accept access and continue.
                                        </p>
                                    </li>
                                </ol>
                                <p>
                                    <b>If you would like to try TimeLike without logging in, you may enable Demo Mode to see how it works!</b>
                                </p>
                                <div className="row center-x center-y">
                                    <button
                                        onClick={ () => {
                                            this.props.setDemoMode(!this.props.demoMode)
                                        }}
                                    >
                                        {
                                            this.props.demoMode ?
                                            "Disable Demo Mode" :
                                            "Enable Demo Mode" 
                                        }
                                    </button>
                                </div>
                            </React.Fragment>
                        ) : null
                    }
                </div>
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
                            <div>
                                <h1>{this.props.userInfo.fullName}</h1>
                            </div>
                        ) : null
                    )
                }
            </main>
        )
    }
}
