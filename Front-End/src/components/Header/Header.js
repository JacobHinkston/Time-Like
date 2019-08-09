import React, { Component } from 'react';
import endpoints from '../../instagram.config';
import './Header.sass';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import SideNavigator from './SideNavigator/SideNavigator';
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            // isLoggedIn: props.isLoggedIn,
            // loading: props.loading,
            // userInfo: props.userInfo
        };
    }
    componentDidMount(){
        
    }
    render(props) {
        return (
            <header className="header-component row center-y">
                <div className="col-5 row center-y">
                    <Link 
                        to="/"
                    >
                        <img src={'./assets/timelike.png'}/>
                    </Link>
                    <h1>TimeLike</h1>
                </div>
                <nav className="col-2 row center-y">
                    <div>
                        
                    </div>
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
                                    className = "col-1 user-btn row center-x"
                                >
                                    <Dropdown
                                        floating
                                        options = {
                                            [
                                                { 
                                                    key: 'edit',
                                                    icon: 'back',
                                                    text: 'Log Out',
                                                    value: 'edit' 
                                                },{ 
                                                    key: 'delete', 
                                                    icon: 'instagram',
                                                    text: 'Instagram',
                                                    value: 'delete' 
                                                }
                                            ]
                                        }
                                        onChange = {
                                            (event) => {
                                                let action = event.target.innerText;
                                                if(action === 'Log Out') {
                                                    alert('You will not be redirected to instagram, where you can logout manualy.');
                                                    window.location = endpoints.instagram;
                                                } else if(action === 'Instagram') {
                                                    window.location = endpoints.instagram;
                                                }
                                            }
                                        }
                                        trigger = {
                                            <img
                                                src = { 
                                                    this.props.userInfo.profilePicture ? 
                                                    this.props.userInfo.profilePicture : 
                                                    "./assets/user.png"
                                                }
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
                                        src="./assets/user.png"
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
                <SideNavigator
                    isLoggedIn =  { this.props.isLoggedIn }
                    loading = { this.props.loading } 
                    userInfo = { this.props.userInfo }
                />
            </header>
        )
    }
}
