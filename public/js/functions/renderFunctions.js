import $ from 'jquery';


import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'



module.exports = {
    renderNewsFeed : (stateData) =>{

        var posts = stateData.posts
        var currentUser = stateData.user
        const communities = stateData.communities
        
   stateData.postsToLoad.forEach((postId)=>{

    var likeState = false;

       var post = posts[postId];
      
        if(post){
            console.log(post)
        $('.newsFeedPostsContainer').append('<div class="post cf-column" id='+postId+ '></div>')
        var postComponent = $('#'+postId )

            /*************
            * Post user -> user_username and user_profilePicture  
            ************** */
            
            postComponent.append('<div class="postUser cf-row"></div>')
            var postUser = $('#'+postId + ' .postUser' )
            postUser.append('<img class="post_userProfilePicture" /><p class="post_userUsername"></p>')
            var post_userProfilePicture = $('#'+postId+ ' .post_userProfilePicture')
            var post_userUsername = $('#'+postId + ' .post_userUsername')
            



            /*************
            * render post info
            -------------------------------------------
            ************** */

            /*************
            * Post image
            ************** */
             postComponent.append('<img class="postImage" />')
            var postImage = $('#'+postId + ' .postImage')

            /*************
            * post Interactions
            ************** */
            postComponent.append('<div class="postInteractions"></div>')

            var postInteractions = $('#'+postId + ' .postInteractions')
           
            postInteractions.append('<div class="postInteractionButtons"></div>')

            var postInteractionButtons = $('#'+postId + ' .postInteractionButtons');
             postInteractionButtons.html('<button class="likeButton"></button><button class="countMeInBtn">Count Me In</button>')

            var countMeInBtn = $('#'+postId + '.countMeInBtn');

            /*************
            * post description
            ************** */
            postComponent.append('<div class="postInfo"><p class="postDesc"></p><p class="postLocation"></p><p class="postUsersInvoled"></p><p class="postCommunity"></p></div>')
            var postInfo = $('#'+postId + ' .postInfo')
            var postDesc = $('#'+postId + ' .postDesc')
            var postLocation = $('#'+postId + ' .postLocation')
            var postUsersInvoled = $('#'+postId + ' .postUsersInvoled')
            var postCommunity = $('#'+postId + ' .postCommunity')
            /*************
            * add data to the post
            ************** */
         
                postInteractions.append('<p class="likeCount">'+post.post_likes+' like(s)</p>')
            





            var likeCount = $('#'+postId + ' .likeCount')

        post_userUsername.html('<a href="/'+post.user_username+'">'+post.user_username+' ')
        post_userProfilePicture.attr("src", "/images/users/"+post.user_profilePicture)
        if(post.post_image.includes("data:image")){
            postImage.attr("src", post.post_image)
        }else{
        postImage.attr("src", "/images/posts/foodphoto"+'.jpg')
        }
         postDesc.html(post.post_desc)
        
        postLocation.html(post.post_location)
        postUsersInvoled.html(post.post_peopleOpted +' / '+ post.post_maxUsers + ' people are in')
        postCommunity.html(communities[post.post_community])



        var likeButton = $('#'+postId + ' .likeButton');
        /**Like Button */
        
        if(post.hasOwnProperty('users_liked')){
            for(var x in post.users_liked){
                console.log(x)
                if(post.users_liked[x] === currentUser.uid){
                    likeButton.html('<i class="fas fa-heart"></i>')
                    likeState = true;
                    break;
                }else{
                    likeButton.html('<i class="far fa-heart"></i>')
                    likeState = false;
                }
            }
        }else{
            likeButton.html('<i class="far fa-heart"></i>')
            likeState = false;
        }

        $(likeButton).on("click", ()=>{
            if(likeState){
                likeButton.html('<i class="far fa-heart"></i>')
                likeState = false;
               
                firebase.database().ref().child("posts/" + postId + "/post_likes").once("value").then((likes)=>{
                    likeCount.html('<p class="likeCount">'+ (likes.val()-1) +' like(s)</p>')
                firebase.database().ref().child("posts/" + postId + "/post_likes").set(
                    likes.val()-1
                ).then(()=>{


                    firebase.database().ref().child("posts/" + postId + "/users_liked").once("value").then((snap)=>{
                        var usersLikedPost = snap.val()
                        for(var ulikedId in usersLikedPost){
                            if(usersLikedPost[ulikedId] == currentUser.uid){
                                firebase.database().ref().child("posts/" + postId + "/users_liked/" + ulikedId).remove().then(()=>{
                                    console.log("removed")
                                })
                            }
                        }
                    })
                })
            })
                return true;
            }else if(!likeState){
                likeButton.html('<i class="fas fa-heart"></i>')
                likeState = true;

               
                firebase.database().ref().child("posts/" + postId + "/post_likes").once("value").then((likes)=>{
                    likeCount.html('<p class="likeCount">'+ ( likes.val()+1) +' like(s)</p>')
                    firebase.database().ref().child("posts/" + postId + "/post_likes").set(
                        likes.val()+1
                    ).then(()=>{
    
                        var postLikesRef = firebase.database().ref().child("posts/"+ postId + "/post_likes")
                        var usersLiked = firebase.database().ref().child("posts/"+ postId + "/users_liked")
                        postLikesRef.set( likes.val()+1).then(()=>{
                       
                            usersLiked.set({
                                [likes.val()] : currentUser.uid
                            }).then(()=>{
                                console.log("liked")
                            })
                        })
                    })
                })
                
                return true;

            }
        })
    


        
        // post.users_liked.forEach(username => {
        //     if(username === currentUser.user_username){
        //         //user has liked the post
        //         //button is active

        //         //user has liked the post
        //     }else{
        //         //button is inactive
        //         $('.likeButton').toggleClass('active');
        //         //user hasn't like the post
        //     }
        // })


            
        }
   })
},
/*********************** 
    renderChoseUsername
 ***********************/

 prependPost : (post, stateData) =>{
     
    var currentUser = stateData.user
        const communities = stateData.communities
    if(post.hasOwnProperty('user_username')){
            var postId = post['postId']
            console.log()

        $('.newsFeedPostsContainer').prepend('<div class="post cf-column" id='+postId+ '></div>')
        var postComponent = $('#'+postId )

            /*************
            * Post user -> user_username and user_profilePicture  
            ************** */
            
            postComponent.append('<div class="postUser cf-row"></div>')
            var postUser = $('#'+postId + ' .postUser' )
            postUser.append('<img class="post_userProfilePicture" /><p class="post_userUsername"></p>')
            var post_userProfilePicture = $('#'+postId+ ' .post_userProfilePicture')
            var post_userUsername = $('#'+postId + ' .post_userUsername')
            



            /*************
            * render post info
            -------------------------------------------
            ************** */

            /*************
            * Post image
            ************** */
             postComponent.append('<img class="postImage" />')
            var postImage = $('#'+postId + ' .postImage')

            /*************
            * post Interactions
            ************** */
            postComponent.append('<div class="postInteractions"></div>')

            var postInteractions = $('#'+postId + ' .postInteractions')
            postInteractions.append('<div class="likeCount"></div>')

            var likeCount = $('#'+postId + ' .likeCount')
       
            var postInteractionButtons = $('#'+postId + ' .postInteractionButtons');
             postInteractionButtons.html('<button class="likeButton"></button><button class="countMeInBtn">Count Me In</button>')

            var countMeInBtn = $('#'+postId + '.countMeInBtn');

            /*************
            * post description
            ************** */
            postComponent.append('<div class="postInfo"><p class="postDesc"></p><p class="postLocation"></p><p class="postUsersInvoled"></p><p class="postCommunity"></p></div>')
            var postInfo = $('#'+postId + ' .postInfo')
            var postDesc = $('#'+postId + ' .postDesc')
            var postLocation = $('#'+postId + ' .postLocation')
            var postUsersInvoled = $('#'+postId + ' .postUsersInvoled')
            var postCommunity = $('#'+postId + ' .postCommunity')
            /*************
            * add data to the post
            ************** */
            if(post.post_likes == 1){
                postInteractions.append('<p class="likeCount">'+post.post_likes+' like</p>')
            }else{
                postInteractions.append('<p class="likeCount">'+post.post_likes+' likes</p>')
            }

        post_userUsername.html('<a href="/'+post.user_username+'">'+post.user_username+' ')
        post_userProfilePicture.attr("src", "/images/users/"+post.user_profilePicture)
        if(post.post_image.includes("data:image")){
            postImage.attr("src", post.post_image)
        }else{
        postImage.attr("src", "/images/posts/foodphoto"+'.jpg')
        }
         postDesc.html(post.post_desc)
        
        postLocation.html(post.post_location)
        postUsersInvoled.html(post.post_peopleOpted +' / '+ post.post_maxUsers + ' people are in')
        postCommunity.html(communities[post.post_community])
        

        var likeButton = $('#'+postId + ' .likeButton');
        /**Like Button */
        
        if(post.hasOwnProperty('users_liked')){
            for(var x in post.users_liked){
                console.log(x)
                if(post.users_liked[x] === currentUser.uid){
                    likeButton.html('<i class="fas fa-heart"></i>')
                    likeState = true;
                    break;
                }else{
                    likeButton.html('<i class="far fa-heart"></i>')
                    likeState = false;
                }
            }
        }else{
            likeButton.html('<i class="far fa-heart"></i>')
            likeState = false;
        }

        $(likeButton).on("click", ()=>{
            if(likeState){
                likeButton.html('<i class="far fa-heart"></i>')
                likeState = false;
               
                firebase.database().ref().child("posts/" + postId + "/post_likes").once("value").then((likes)=>{
                    likeCount.html('<p class="likeCount">'+ (likes.val()-1) +' like(s)</p>')
                firebase.database().ref().child("posts/" + postId + "/post_likes").set(
                    likes.val()-1
                ).then(()=>{


                    firebase.database().ref().child("posts/" + postId + "/users_liked").once("value").then((snap)=>{
                        var usersLikedPost = snap.val()
                        for(var ulikedId in usersLikedPost){
                            if(usersLikedPost[ulikedId] == currentUser.uid){
                                firebase.database().ref().child("posts/" + postId + "/users_liked/" + ulikedId).remove().then(()=>{
                                    console.log("removed")
                                })
                            }
                        }
                    })
                })
            })
                return true;
            }else if(!likeState){
                likeButton.html('<i class="fas fa-heart"></i>')
                likeState = true;

               
                firebase.database().ref().child("posts/" + postId + "/post_likes").once("value").then((likes)=>{
                    likeCount.html('<p class="likeCount">'+ ( likes.val()+1) +' like(s)</p>')
                    firebase.database().ref().child("posts/" + postId + "/post_likes").set(
                        likes.val()+1
                    ).then(()=>{
    
                        var postLikesRef = firebase.database().ref().child("posts/"+ postId + "/post_likes")
                        var usersLiked = firebase.database().ref().child("posts/"+ postId + "/users_liked")
                        postLikesRef.set( likes.val()+1).then(()=>{
                       
                            usersLiked.set({
                                [likes.val()] : currentUser.uid
                            }).then(()=>{
                                console.log("liked")
                            })
                        })
                    })
                })
                
                return true;

            }
        })

            
        
    }
 },



/*********************** 
    renderChoseUsername
 ***********************/
 renderChoseUsername : () =>{
    $(document).ready(()=>{
          $('.newUserView').css({
                'display' :'flex'
            })
            $('.mainContainer').remove()
    })
 },

 /*********************** 
    renderHome before posts are loaded
 ***********************/
renderHome : () =>{
    $('.newUserView').remove()
            $('.mainContainer').css({
                'display' : 'flex'
            })
        
        //show loading screen
        
            $('.mainContainer').append('<div class="loadingFlex"></div>')
            $('.loadingFlex').html('<img class="loadingGif" src="./images/icons/loading1.gif" />')
    
}


}