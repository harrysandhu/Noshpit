import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {defaultStyles} from './css/styleSheet1'
import {StyleSheet, css} from 'aphrodite';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import Logo from './components/Logo'

import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import store from './store'
 

class App extends Component{

    constructor(props){
        super(props);
        this.state = { 
            mode : true,
        }
        this.changeMode = this.changeMode.bind(this)
    }

    changeMode(){
         const {mode} = this.state
        this.setState({mode: !mode})
    }

    render(){   
        const {mode} = this.state
        if(mode)
            return (
                <div className={css(defaultStyles.containerFlex)}>
                    <Logo size="large" />
                    <SignUpForm />
                    <div className={css(defaultStyles.optionsContent)}>
                        <p>or</p>
                    <button onClick={this.changeMode} className={css(defaultStyles.buttonDefault, defaultStyles.buttonBlack)}>
                        Login
                        </button>   
                    </div>
                </div>
            );
        else{
            return (
               <div className={css(defaultStyles.containerFlex)}>
                    <Logo size="large" />
                    <LogInForm />
                    <div className={css(defaultStyles.optionsContent)}>
                        <p>Don't have an account?</p>
                    <button onClick={this.changeMode} className={css(defaultStyles.buttonDefault, defaultStyles.buttonBlack)}>
                        Create an Account
                        </button>   
                    </div>
                </div>
            );
        }
    }
}



const root = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, root)