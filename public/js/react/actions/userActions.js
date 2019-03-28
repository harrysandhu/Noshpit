import axios from 'axios'

export function userSignUp(user_fullName, user_email, user_password){
    return {
        
        type: 'USER_SIGNUP',
        payload : axios({
            method :'POST',
            url : '/auth/signup',
            data : {
                user_fullName,
                user_email,
                user_password
            }   
        })
    }
    
}



export function userLogIn(user_email, user_password){
    return {
        type: 'USER_LOGIN',
        payload : axios({
            method :'POST',
            url : '/auth/login/',
            data : {
                user_email,
                user_password
            }   
        })
    }
    
}


