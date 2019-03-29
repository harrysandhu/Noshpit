
module.exports = {


    loadPosts : (localPosts, users, communities, db) => {
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
}

