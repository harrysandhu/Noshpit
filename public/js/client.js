
import {nameIsValid, 
        emailIsValid, 
        passwordIsValid,
        signUpUser}
        from './functions/userFunctions'
import axios from 'axios'

// import {renderSignupForm,
//         renderUser} from './functions/helperFunctions'
import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'

import $ from 'jquery';



    firebase.initializeApp({
        apiKey: "AIzaSyA_t0Gr9vd_6-OVw3P6vZwhNiL4mLYmVZg",
        authDomain: "noshpit-78bdc.firebaseapp.com",
        databaseURL: "https://noshpit-78bdc.firebaseio.com",
        projectId: "noshpit-78bdc",
        storageBucket: "noshpit-78bdc.appspot.com",
        messagingSenderId: "971810847518"

    })



var db = firebase.database()
var users = db.ref().child("users")
//var usernames = db.ref().child("usernames");

function UserAuth(){

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            console.log(user)
           window.location.href = "/home"

        }else{
            $('.mainContainer').css({
                "display" : 'flex',
            })
        }
    })
}

UserAuth()

$(document).ready(() => {

    $('.formInput').keyup((e) => {
        e.preventDefault()
        if(nameIsValid($("[name='user_fullName']").val()) && 
        emailIsValid($("[name='user_email']").val()) && 
        passwordIsValid($("[name='user_password']").val())){
            $('.buttonDefault').prop('disabled', false)
        }else{
            $('.buttonDefault').prop('disabled', true)
        }
    })

    $('.signUpForm').on('submit', (e) => {
        e.preventDefault();
        var user_fullName = $("[name='user_fullName']").val()
        var user_email = $("[name='user_email']").val()
        var user_password = $("[name='user_password']").val()

        var error = null;

        if(!nameIsValid(user_fullName)){

            error = "Invalid Name"

        }else if(!emailIsValid(user_email)){
            error  = "Invalid Email Address"


        }else if(!passwordIsValid(user_password)){
            error = "Invalid Password"
            
        }else{
            //signup user
              firebase.auth().createUserWithEmailAndPassword(user_email, user_password).then(() => {
                 firebase.auth().onAuthStateChanged((user) => {
               
                    if(user){
                        var uid = user.uid
                        console.log(user)
       
                             users.child(uid).set({
                                 user_username: null,
                                user_fullName : user_fullName,
                                user_email : user_email,
                                user_bio: "I do this and that.",
                                user_profilePicture: 'default.jpg',                     
                            }).then(()=>{
                                UserAuth();
                            })


                    }else{
                        error =  "Something went wrong!"
                    }
                }).catch(function(err) {
                    error = err.message
                })
              }).catch(function(err) {
                if(err.code == "auth/email-already-in-use"){
                    error = "User with this email already exists."
                }
           })

        
           

        }

        if(error !== null){
            $('.formContainer').prepend('<div class="errorPane">'+error+'</div>')
            return false;
        }

    })

})



