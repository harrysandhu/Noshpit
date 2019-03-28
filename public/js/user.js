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

const usernames = db.ref().child("usernames")
const posts = db.ref().child("posts")
const communities = db.ref().child('communities')




var user = {data: {}, loading: true, usernameIsSet: false}

var localPosts = {data: {}, loading: true}



function loadPosts(){
    return new Promise((resolve, reject) => {
        //var communityPosts;
        communities.on("value", (snap) =>{
            for(var cid = 0; cid < snap.val().length; cid++){
                
                var communityPosts = snap.val()[cid].c_posts;
                communityPosts.forEach(postId => {
                
                       var postRef = db.ref().child("posts/"+ postId)
                    postRef.once("value").then((postSnapshot) =>{
                        var post_user = postSnapshot.val().post_user
                        localPosts.data[postId] = postSnapshot.val()
                        var userRef = users.child(post_user)
                         //localPosts.data[postId].user = {}
                        userRef.once("value").then((userSnapshot) =>{
                            console.log(userSnapshot.val().user_username)
                            localPosts.data[postId]['user'] = {...userSnapshot.val()}

                            localPosts.loading = false;
                            resolve(localPosts.data)
                        })
                        



                        
                    })
                  
                });
               
            }
        })
        
    })
      
}





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
            reject("Something went wrong")
        }
       


})


    })
}





function usernameIsAvailable(username) {

    var x = false;
    users.on("value", (snap) => {
        //snap.val() is the all the users

        for (var u in snap.val()) {
            if (username === snap.val()[u].user_username) {
                x = false;
                return x;
            } else {
                x = true;
            }
        }
    })
    return x;
}


function getUser(postId){
    return new Promise((resolve, reject) =>{
        resolve(localPosts.data[postId]['user'])
        reject("Something went wrong")
    })
}


function renderNewsFeed(posts){
   
   
    for(var postId in posts){
    console.log("the post id is::", posts[postId].user)
    $('.newsFeedPostsContainer').append('<div class="post cf-column" id='+postId+ '></div>')
    var postComponent = $('#'+postId )

    //post user
    postComponent.append('<div class="postUser cf-row"></div>')
        var postUser = $('#'+postId + ' .postUser' )
            postUser.append('<img class="post_userProfilePicture" /><p class="post_userUsername"></p>')
            var post_userProfilePicture = $('#'+postId+ ' .post_userProfilePicture')
            var post_userUsername = $('#'+postId + ' .post_userUsername')
    ////////

    //post image
    postComponent.append('<img class="postImage" />')
    var postImage = $('#'+postId + ' .postImage')
    ////////

    //post interactions
    postComponent.append('<div class="postInteractions"></div>')
    var postInteractions = $('#'+postId + ' .postInteractions')

    postComponent.append('<div class="postInfo"><p class="postDesc"></p><p class="postLocation"></p><p class="postUsersInvoled"></p></div>')
    var postInfo = $('#'+postId + ' .postInfo')
    var postDesc = $('#'+postId + ' .postDesc')
    var postLocation = $('#'+postId + ' .postLocation')
    var postUsersInvoled = $('#'+postId + ' .postUsersInvoled')


        var post = posts[postId]
        const user = post.user
        
        // var like_state;
        // for(int i = 0; i < post.post_likes; i++){
        //     if(post.users_liked[i] == user.data.user_username){
        //         like_state = true;
        //     }
        // }

        console.log(post.user_username)
        var username = null;
        
        
        if(post.post_likes == 1){
            postInteractions.append('<p class="likeCount">'+post.post_likes+' like</p>')
        }else{
         postInteractions.append('<p class="likeCount">'+post.post_likes+' likes</p>')
        }
        post_userUsername.html('<a href="/'+user.user_username+'">'+user.user_username+' ')
        post_userProfilePicture.attr("src", "/images/users/"+user.user_profilePicture)
        postImage.attr("src", "/images/posts/foodphoto"+'.jpg')
       
        postDesc.html(post.post_desc)
        postLocation.html(post.post_location)
        postUsersInvoled.html(post.post_peopleOpted +' / '+ post.post_maxUsers + ' people are in')
        
        
    }
}




loadUser().then(() =>{
    loadPosts().then((posts)=>{

           



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
        var valid = usernameIsValid(username) && usernameIsAvailable(username);
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
    })
})
