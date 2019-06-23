import React, { Component } from 'react';
import endpoints from '../../instagram.config';
import './Header.css';
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: props.token
        };
    }
    componentDidMount(){

    }
    render() {
        return (
            <header className="header-component">
                <h2>This is the header</h2>
                <a 
                    className="ui button" 
                    href={
                        this.state.token ? 
                        endpoints.instagram :
                        endpoints.token_url
                    }
                >
                    {
                        this.state.token ?
                        "Logout" :
                        "Get Token"
                    }
                </a>
            </header>
        )
    }
}
