import React, { Component } from 'react';
import endpoints from '../../instagram.config';
import './Header.sass';
import timeLikeLogo from '../../assets/timelike.png';
import userImage from '../../assets/user.png';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'semantic-ui-react'
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            loading: props.loading,
            userInfo: undefined
        };
    }
    componentDidMount(){
        
    }
    render(props) {
        const options = [
            { key: 'edit', icon: 'back', text: 'Log Out', value: 'edit' },
            { key: 'delete', icon: 'instagram', text: 'Instagram', value: 'delete' },
          ]
        return (
            <header className="header-component row center-y">
                <div className="col-5 row center-y">
                    <a href="/">
                        <img src={timeLikeLogo}/>
                    </a>
                    
                    <h1>TimeLike</h1>
                </div>
                <nav className="col-2 row center-y">
                    <Link
                        className="col-1"
                        to="/analytics"
                    >
                        Analytics
                    </Link>
                    <Link
                        className="col-1"
                        to="/about"
                    >
                        About
                    </Link>
                    {
                        this.props.isLoggedIn ? (
                            this.props.userInfo ? (
                                <div 
                                    className="col-1 user-btn row center-x"
                                >
                                    <Dropdown
                                        className=''
                                        floating
                                        options={options}
                                        trigger={
                                            <img
                                                src={ this.props.userInfo.profilePicture }
                                                alt="#"
                                            />
                                        }
                                    />
                                </div> 
                            ) : (
                                <div
                                    className = "loading col-1 user-btn row center-x"
                                >
                                    <img
                                        src={userImage}
                                        alt="#"
                                    />
                                </div>
                            )
                        ) : (
                            <a
                                href={endpoints.token_url}
                                className="col-1"
                            >
                                Login
                            </a>
                        )
                    }
                </nav>
            </header>
        )
    }
}
