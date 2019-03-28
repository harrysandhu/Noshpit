//var hf = require('./functions/helperFunctions')
import $ from 'jquery';
import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'
//import initialized firebase app
//import firebaseConfig from './config'

import {
    usernameIsValid
} from './functions/userFunctions'


firebase.initializeApp({
    apiKey: "AIzaSyA_t0Gr9vd_6-OVw3P6vZwhNiL4mLYmVZg",
    authDomain: "noshpit-78bdc.firebaseapp.com",
    databaseURL: "https://noshpit-78bdc.firebaseio.com",
    projectId: "noshpit-78bdc",
    storageBucket: "noshpit-78bdc.appspot.com",
    messagingSenderId: "971810847518"

})

const db = firebase.database()
const users = db.ref().child("users")
const usernames = db.ref().child('usernames')
const MODES = {view : 'view', auth: 'auth'}
var user = {data: {}, loading: true, usernameIsSet: false, loggedIn: false}
var mode = MODES.view
var url_username = window.location.pathname.substring(1)
console.log(url_username)

//if user is loggedin, loads the user data, checks if the profile page to
//render belongs to the same user, or else mode = MODES.view
function loadUser() {

    return new Promise((resolve, reject) => { 
            firebase.auth().onAuthStateChanged((u) =>{
        if(u){
            user.loggedIn = true;
            var userRef = users.child(u.uid)
            userRef.on("value",(snap) => {
            user.data = {...snap.val()}
            console.log(user.data)
            if(!user.data.hasOwnProperty('user_username')){
            
            resolve(user.loading = false)
            
            }else if(user.data.user_username === null){
               resolve( user.loading = false)
            }else{
                user.usernameIsSet = true
                
                if(user.data.user_username === url_username){
                    console.log("oye")
                    mode = MODES.auth;
                }
                resolve(user.loading = false);

                }
            })
           
        }else{
            //get data for url's user
        mode = MODES.view;
           resolve(user.loggedIn = false)
        }
       


})

    })
}

function loadViewUser(url_username) {
    
    return new Promise((resolve, reject) => {

            try {
            
            usernames.on("value", (snap) =>{
                if(snap.val()[url_username]){
                    console.log("je;llo")
                     var uid = snap.val()[url_username]
                    var userRef = users.child(uid)
                    userRef.on("value", (data) =>{
                        console.log(data.val())
                        resolve(data.val())
                    })
                }else{
                    console.log(";llo")
                    reject("User not found.")
                }
                   
                
            })

            } catch (error) {
               throw new Error("User not found")
            }
          
       

    }).catch((e) =>{
        throw new Error("User not found")
    }) 
    
}



function renderUserProfile(u){

    $('.userAvatar').attr("src", "./images/"+ u.user_profilePicture)
    $('.user_username').append('@' + u.user_username)
    $('.user_userFullName').append(u.user_fullName)
    $('.user_userBio').append(u.user_bio)
}







loadUser().then(() => {
    console.log("blahh::", user)
    console.log(mode)
    $(document).ready(() =>{
         $('.userHome').on('click', (e)=>{
                e.preventDefault()
                window.location.href = "/"+ user.data.user_username
            })
        if(mode === MODES.view){
        $('.userAuth').remove()
        loadViewUser(url_username).then((viewUser)=>{
            console.log(url_username)
            renderUserProfile(viewUser)
        }).catch((e)=>{
            $('.contentFlex').html('<img src="./images/notFound.gif" class="notFoundImg"><h1 class="errorUserNotFound">'+e.message+ '<h1>')
        })

    }else if(mode === MODES.auth){
            renderUserProfile(user.data);


    $('.logoutBtn').on('click', () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.href = "/"
        }).catch(function(error) {
            // An error happened.
            console.log(error)
        });
    })


        }
    })
    
})










