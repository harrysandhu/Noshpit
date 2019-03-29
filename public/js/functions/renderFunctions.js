import $ from 'jquery';

module.exports = {
    renderNewsFeed : (posts) =>{

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

        
        var username = null;
        
        
        if(post.post_likes == 1){
            postInteractions.append('<p class="likeCount">'+post.post_likes+' like</p>')
        }else{
         postInteractions.append('<p class="likeCount">'+post.post_likes+' likes</p>')
        }
        if(user.user_username){
        post_userUsername.html('<a href="/'+user.user_username+'">'+user.user_username+' ')
        post_userProfilePicture.attr("src", "/images/users/"+user.user_profilePicture)
        postImage.attr("src", "/images/posts/foodphoto"+'.jpg')
       
        postDesc.html(post.post_desc)
        postLocation.html(post.post_location)
        postUsersInvoled.html(post.post_peopleOpted +' / '+ post.post_maxUsers + ' people are in')
        
        }
    }
}
}