import React, { Component } from 'react'
import {defaultStyles} from '../css/styleSheet1'
import {StyleSheet, 
        css} from 'aphrodite';
import {emailIsValid, 
        passwordIsValid, nameIsValid } from '../functions/userFunctions'
import {userSignUp } from '../actions/userActions'

import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import store from '../store'


//connect to store and recieve the state

@connect((store) => {
    return {
        loading: store.user.loading,
        loggedIn : store.user.loggedIn,
        user_email: store.user.user_email,
        error: store.user.error
    }
})

export default class SignUpForm extends Component {
  constructor(props) {
      super(props);
       this.state = {
           user_fullName : '',
            user_email : '',
            user_password: '',
        }
        this.handleInput = this.handleInput.bind(this)
        this.validateForm = this.validateForm.bind(this)
  }

    

    handleInput(e){
        this.setState({ [e.target.name]: e.target.value })
        
    }   

    validateForm(e){
        e.preventDefault();
        const {user_fullName, user_email, user_password} = this.state
        this.props.dispatch(userSignUp(user_fullName, user_email, user_password));  
    }

    render(){
        const {user_fullName, user_email, user_password} = this.state
       
        var formIsValid = nameIsValid(user_fullName) && emailIsValid(user_email) && passwordIsValid(user_password)
       
       
        return (
            <div className={css(defaultStyles.formContainer)}>
                
                <form onSubmit={this.validateForm}>
                    <input className={css(defaultStyles.formInput)}
                                    type="text" 
                                    onChange={this.handleInput} 
                                    value={this.state.user_fullName}
                                    placeholder="Full Name" 
                                    name="user_fullName"
                            />
                    <input className={css(defaultStyles.formInput)}
                                    type="email" 
                                    onChange={this.handleInput} 
                                    value={this.state.user_email}
                                    placeholder="Email Address" 
                                    name="user_email"
                            />
                    <input className={css(defaultStyles.formInput)}
                                    type="password" 
                                    onChange={this.handleInput} 
                                    value={this.state.user_password}
                                    placeholder="Choose a Password" 
                                    name="user_password"
                            />
                    <input type="submit" value="Sign In" className={css(defaultStyles.buttonDefault)} 
                                disabled={!formIsValid} />
                </form>
            </div>
        );
    }

}
