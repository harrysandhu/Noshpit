
module.exports = {


    loadPosts : (localPosts, users, communities, db, user) => {
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
                    
                         localPosts.data[postId]['user'] = user
                            resolve(localPosts.data)
                    })
                  
                });
               
            }
        })
        
    })
    }
}

