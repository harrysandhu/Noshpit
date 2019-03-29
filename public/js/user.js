//var hf = require('./functions/helperFunctions')
import $ from 'jquery';
import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'
//import initialized firebase app
//import firebaseConfig from './config'



import {
    usernameIsValid, usernameIsAvailable
} from './functions/userFunctions'



import {
    renderNewsFeed
} from './functions/renderFunctions'


import {
    loadPosts
} from './functions/loadFunctions'


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

const usernames = db.ref().child("usernames")
const posts = db.ref().child("posts")
const communities = db.ref().child('communities')




var user = {data: {}, loading: true, usernameIsSet: false}

var localPosts = {data: {}, loading: true}





function loadUser() {
    return new Promise((resolve, reject) => { 
            firebase.auth().onAuthStateChanged((u) =>{
        if(u){
            var userRef = users.child(u.uid)
            userRef.on("value",(snap) => {
            user.data = {...snap.val()}
            user.data['uid'] = u.uid;
            console.log(user.data)
            if(!user.data.hasOwnProperty('user_username')){
            resolve(user.loading = false)
            
            }else if(user.data.user_username === null){
               resolve( user.loading = false)
            }else{
                user.usernameIsSet = true
                resolve(user.loading = false);
                }
            })
           
        }else{

            window.location.href = "/";
            reject("Something went wrong")
        }
       


})


    })
}








function getUser(postId){
    return new Promise((resolve, reject) =>{
        resolve(localPosts.data[postId]['user'])
        reject("Something went wrong")
    })
}




loadUser().then(() =>{
    loadPosts(localPosts, users, communities, db).then((posts)=>{

$(document).ready(() => {
    console.log(user)
    
    renderNewsFeed(posts)

    if(!user.loading){
        if(!user.usernameIsSet){
            $('.newUserView').css({
                'display' :'flex'
            })
            $('.mainContainer').remove()
        }else{
            $('.newUserView').remove()
            $('.mainContainer').css({
                'display' : 'flex'
            })
        }
    }

    $('.usernameInput').keyup((e) => {
        //console.log(usernameIsAvailable())
        e.preventDefault()
        var username = $("[name='user_username']").val().trim()
        var valid = usernameIsValid(username) && usernameIsAvailable(users, username);
        $('.buttonDefault').prop('disabled', !valid);

        if (!valid) {
            $('.usernameInput').css({
                'background-color': '#ffb19b',
                'transition': '.4s'
            })

        } else {
            //valid
            $('.usernameInput').css({
                'background-color': '#c3ffb5',
                'transition': '.4s'
            })
        }

    })


    //new pos




    $('.lastStepForm').on("submit", (e) => {
        e.preventDefault()
        var uname = $("[name='user_username']").val().trim()

        users.child(firebase.auth().currentUser.uid).update({user_username : uname}).then(() => {
            usernames.child(uname).set(firebase.auth().currentUser.uid)
        window.location.href = "/home"
    }).catch((e) =>{
            console.log(e)
            $('.usernameInput').css({
                'background-color': '#ffb19b',
                'transition': '.4s'
            })
    })
    })

    $('.userHome').on('click', (e)=>{
                e.preventDefault()
                window.location.href = "/"+ user.data.user_username
            })



    $('.logoutBtn').on('click', () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.href = "/"
        }).catch(function(error) {
            // An error happened.
            console.log(error)
        });
    })
})
    }).catch((e) =>{
        console.log(e)
    })
}).catch((e) =>{
    console.log(e)
})
