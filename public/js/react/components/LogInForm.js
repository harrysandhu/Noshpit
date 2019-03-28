import React, { Component } from 'react'
import {defaultStyles} from '../css/styleSheet1'
import {StyleSheet, 
        css} from 'aphrodite';
import {emailIsValid, 
        passwordIsValid, nameIsValid } from '../functions/userFunctions'
 import {userSignUp } from '../actions/userActions'



//connect to store and recieve the state

export default class SignUpForm extends Component {
  constructor(props) {
      super(props);
       this.state = {
            user_email : '',
            user_password: '',
        }
        this.handleInput = this.handleInput.bind(this)
        this.validateForm = this.validateForm.bind(this)
  }

    

    handleInput(e){
        this.setState({ [e.target.name]: e.target.value })
        
    }

    validateForm(){
        const {user_email, user_password} = this.state
        userLogIn(user_email, user_password)
    }

    render(){
      
        var formIsValid =  emailIsValid(user_email) && passwordIsValid(user_password)
        return (
            <div className={css(defaultStyles.formContainer)}>
                
                <form >
                  
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
                    <button className={css(defaultStyles.buttonDefault)}
                                onClick={this.validateForm} 
                                disabled={!formIsValid} >
                                Sign Up   
                    </button>
                </form>
            </div>
        );
    }

}
