


const initialState = {
    user_email : null,
    logged_in : false,
    loading: false,
    error: null,
}




export default function userReducer(state=initialState, action){
    switch(action.type){
        case 'USER_SIGNUP_PENDING':{
            state = {...state, loading: true}
            break;
        }
        case 'USER_SIGNUP_FULFILLED':{
            state = {...state, 
                    loading: false, 
                    logged_in: true, 
                    user_email: action.payload.data.user_email
                    }
            console.log(state)
        break;
        }

        case 'USER_SIGNUP_REJECTED' : {
            state = {...state, 
            loading: false,
             logged_in: false,
            error: action.payload.data.error
             }
            break;
        }


        
    }

    return state;
}