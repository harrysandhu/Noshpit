import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {defaultStyles} from '../css/styleSheet1'
import {StyleSheet, css} from 'aphrodite';



export default class Logo extends Component{

    render(){
            const {size} = this.props;
            
        return (
            <img src="../../images/logo1.png" className={css(defaultStyles.logoImage)} />
        );  
    }
}




