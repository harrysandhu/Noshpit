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
    // renderNewsFeed, 
    renderChoseUsername, 
    renderHome,
     renderNewsFeed
} from './functions/renderFunctions'


// import {
//     loadPosts
// } from './functions/loadFunctions'


firebase.initializeApp({
    apiKey: "AIzaSyA_t0Gr9vd_6-OVw3P6vZwhNiL4mLYmVZg",
    authDomain: "noshpit-78bdc.firebaseapp.com",
    databaseURL: "https://noshpit-78bdc.firebaseio.com",
    projectId: "noshpit-78bdc",
    storageBucket: "noshpit-78bdc.appspot.com",
    messagingSenderId: "971810847518"

})

/** */
const db = firebase.database()

const users = db.ref().child("users")
const usernames = db.ref().child("usernames")
const posts = db.ref().child("posts")





//var user = {data: {}, loading: true, usernameIsSet: true}
var localPosts = {data: {}, loading: true}


/**page state */
var state = {
    user : {},
    usernameIsSet: true,
    userIsLoading: true,
    //posts
    posts : {},
    allPosts: [],
    postsToLoad: [],
    postsAreLoading: true,
    postInitial: 0,
    postFinal : 4,
    postsHaveReachedEnd: false,
}




//load user
function loadUser() {
    return new Promise((resolve, reject) => { 
            firebase.auth().onAuthStateChanged((u) =>{
        if(u){
            var userRef = users.child(u.uid)
            //get user with the userRef db ref
            userRef.on("value",(snap) => {
                
                state.user = {...snap.val()}
                //assign uid to current user
                state.user.uid = u.uid;
                console.log(state.user);

                //check if user's username is set    
                if(state.user.hasOwnProperty('user_username')){
                    if(state.user.user_username === null){
                        state.usernameIsSet = false;
                    }else{
                        state.usernameIsSet = true;
                    }
                }else{
                    state.usernameIsSet = false;
                }
            
                state.userIsLoading = false;
                resolve(state.user);
            })
        }else{
            window.location.href = "/";
            reject("You need to log in!")
        }
    })
})
}


function ApplyUIEventListeners(){
  
        $('.newPostBtn').on("click", ()=>{
            e.preventDefault();
            
        })


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

            $('.lastStepForm').on("submit", (e) => {
                e.preventDefault()
                var uname = $("[name='user_username']").val().trim()

                users.child(firebase.auth().currentUser.uid)
                .update({user_username : uname})
                .then(() => {
                    usernames.child(uname)
                    .set(firebase.auth().currentUser.uid)
            
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
                        window.location.href = "/"+ state.user_username
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
}



// function getUser(postId){
//     return new Promise((resolve, reject) =>{
//         resolve(localPosts.data[postId]['user'])
//         reject("Something went wrong")
//     })
// }

function postsIdComperator(a, b){
    if(a > b){
        return 1;
    }else if(a < b){
        return -1;
    }
    return 0;
}

function loadPosts(postInitial, postFinal){
    return new Promise((resolve, reject) =>{
    const communities = db.ref().child('communities');
    communities.once("value").then((comm_snap)=>{
        var postsByCommunities = []
        
        for(var cid in comm_snap.val()){
            comm_snap.val()[cid].c_posts.forEach(postId =>{
                postsByCommunities.push(postId)
            })
        }

        //list of posts to load
        postsByCommunities.sort(postsIdComperator);
        postsByCommunities = postsByCommunities.reverse();
        state.allPosts = postsByCommunities;
        console.log(state.allPosts)

        
        
        //set postsToLoad and set state for rendering
// if(postInitial >= postsByCommunities){
//             state.postsHaveReachedEnd = true;
//         }
        var postsToLoad = []
        postInitial = (postInitial >= postsByCommunities) ? postsByCommunities.length - 1 : postInitial;
        
        postFinal = (postFinal > postsByCommunities.length) ? postsByCommunities.length : postFinal;




        for(var x = postInitial; x < postFinal; x++){
            postsToLoad.push(postsByCommunities[x]);
        }

        state.postsToLoad = postsToLoad;

        console.log("Posts to load: (loadPosts): ", state.postsToLoad)
        
        postsToLoad.forEach(postId => {
            var postRef = db.ref().child("posts/" + postId)
            postRef.on("value", (post_snap)=>{
                state.posts[postId] = post_snap.val();
                var post_uid = post_snap.val().post_user;
                var postUserUsernameRef = db.ref().child('users/' + post_uid + '/user_username')
                var postUserProfilePictureRef = db.ref().child('users/' + post_uid + '/user_profilePicture')

                postUserUsernameRef.on("value", (usernameSnap) =>{
                    state.posts[postId]['user_username'] = usernameSnap.val();

                })

                postUserProfilePictureRef.on("value", (profilePicSnap) =>{
                    state.posts[postId]['user_profilePicture'] = profilePicSnap.val();
                })

            })
            

        })
        console.log(state.postInitial+  ": " + state.postFinal)
        state.postInitial = postInitial + 4;
        state.postFinal = postFinal + 4;
        if(postFinal >= state.allPosts.length){
            state.postsHaveReachedEnd = true;
        }
        
        console.log("stateposts:", state.posts)
        console.log("Posts (i,f) after loading: " + state.postInitial+  ": " + state.postFinal)
        setTimeout(() => {
            resolve(state)
        }, 2000);
        
        

    }).catch((e) =>{
        console.log(e)
reject("Something went wrong.")
    })
    

    })

}


// function loadPosts(postInitial, postFinal){
//     return new Promise((resolve, reject) =>{
//         communities.on("value", (snap) =>{
            
//         })
//     })
// }



$(document).ready(()=>{
    ApplyUIEventListeners();   
})


//load user.
loadUser().then((user) =>{
    if(!state.userIsLoading && !state.usernameIsSet){
        renderChoseUsername();
        return false; 
    }
    else{
    //render
        $(document).ready(()=>{
        renderHome()

        /**
        * Load initial posts -> with initial state
        * --------**INITIAL RENDERING**---------
         */


        loadPosts(state.postInitial, state.postFinal).then((stateData)=>{
            
            console.log("statedata:: ", stateData);
                
            renderNewsFeed(stateData);
            state.postsAreLoading = false;
        

             /**
        * Load posts when page reaches end.
        * --------**RENDER ON SCROLLING**---------
         */
            $(window).scroll( ()=>{
                if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    if(!state.postsHaveReachedEnd){
                        loadPosts(state.postInitial, state.postFinal).then((stateDataOnScroll) =>{
                            renderNewsFeed(stateDataOnScroll);
                            console.log(stateDataOnScroll)
                            state.postsAreLoading = false;
                        })
                    }
                }
            })
           
            $('.loadingFlex').remove()
            console.log("blehh:: ", stateData)

                  
            })
    })
    }
})