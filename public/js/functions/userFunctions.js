



export function emailIsValid(email){
    var validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.length < 4){
        return false;
    }
    else if(!validEmailPattern.test(email)){
        return false;
    }
    else{
        return true;
    }
}    


export function passwordIsValid(password){
    if(password.length < 5){
        return false;
    }else{
        return true;
    }
}

export function nameIsValid(name){
    if(name.length < 2 || name.length > 50){
        return false;
    }
    else{
        return true;
    }
}


export function usernameIsValid(username){
    username = username.trim().toLowerCase()
    console.log(username)
    var validUsernamePattern = /^([a-z0-9_-]+)$/;
    if(!validUsernamePattern.test(username)){
        return false;
    }
    else if(username.length < 2 || name.length > 20){
        return false;
    }
    return true;

    
}





// export function signUpUser(user_fullName, user_email, user_password, firebase, users){
      
    
     

// }
 
