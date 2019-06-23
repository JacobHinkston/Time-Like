import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import queryString from 'query-string';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends Component{

    constructor(){
        super();
        let token = window.location.href.split('=')[1];
        console.log(token)
        this.state = {
            token
        };



        this.userHasToken = this.userHasToken.bind(this);
        this.userHasToken();
    }
    userHasToken(){
        
    }
    componentDidMount(){
        
    }

    render(){
        return(
            <BrowserRouter>
                <div className="app-component">
                    <Header
                        token={this.state.token}
                    />
                    <Switch>
                        <main>
                            <h1>Main</h1>
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

                            />
                            <Route
                                path="/reset"
                                component={Reset}
                            /> */}
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
