import $ from 'jquery';

module.exports = {
    renderNewsFeed : (stateData) =>{

        var posts = stateData.posts
        var currentUser = stateData.user
    
        
   stateData.postsToLoad.forEach((postId)=>{

       var post = posts[postId];
        

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
            postInteractions.append('<div class="likeCount"></div>')
            var likeCount = $('#'+postId + ' .likeCount')
            postInteractions.append('<div class="postInteractionButtons"></div>')
            var postInteractionButtons = $('#'+postId + '.postInteractionButtons');
            postInteractionButtons.append('<button class="likeButton">Like</button>')
            var likeButton = $('#'+postId + '.likeButton');
            console.log(likeButton[0])
            postInteractionButtons.append('<button class="countMeInBtn">Count Me In</button>')
            var countMeInBtn = $('#'+postId + '.countMeInBtn');

            /*************
            * post description
            ************** */
            postComponent.append('<div class="postInfo"><p class="postDesc"></p><p class="postLocation"></p><p class="postUsersInvoled"></p></div>')
            var postInfo = $('#'+postId + ' .postInfo')
            var postDesc = $('#'+postId + ' .postDesc')
            var postLocation = $('#'+postId + ' .postLocation')
            var postUsersInvoled = $('#'+postId + ' .postUsersInvoled')
                
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
        postImage.attr("src", "/images/posts/foodphoto"+'.jpg')
         postDesc.html(post.post_desc)
        
        postLocation.html(post.post_location)
        postUsersInvoled.html(post.post_peopleOpted +' / '+ post.post_maxUsers + ' people are in')

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


            

   })
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