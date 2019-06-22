import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends Component{
    constructor(){
        super();
        this.state = {};
    }
    render(){
        return(
            <BrowserRouter>
                <div className="app-component">
                    <Switch>
                        <main>
                            <h1>TimeLike</h1>
                        </main>
                    </Switch>
                </div>
            </BrowserRouter>
            
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
