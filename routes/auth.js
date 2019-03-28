import express from 'express'
import firebase from 'firebase'
import {firebaseConfig} from '../public/js/config'
import {emailIsValid, 
        passwordIsValid, nameIsValid } from '../public/js/functions/userFunctions'


var auth = express.Router();


//configure firebase

var firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()
const fauth = firebaseApp.auth()




auth.post('/login', (res, req) => {
    return;
})



// auth.post("/signup", (req, res) => {
//     console.log(firebaseConfig)
//     //const user_fullName = req.body.user_fullName
//     const user_email = req.body.user_email;
//     const user_password = req.body.user_password
//     //var error = '';

//     try{
//         fauth.createUserWithEmailAndPassword(user_email, user_password)
//         fauth.signInWithEmailAndPassword(user_email, user_password).then((user) =>{
//             fauth.onAuthStateChanged((user) => {
//                 if(user){
//                     console.log(user)
//                 }else{
//                     console.log("not logged in")
//                 }
//             }) 
//         }).catch((e) => {res.json({error: throw new Error(e) })} )

//         return res.json({user_email: user_email})
//     }catch(e){
//         return res.json({error: e})
//     }
//     // firebase.auth().onAuthStateChange((user) =>{
//     //                 if(user){
//     //                     console.log(user)
//     //                     res.json({user_email: user_email})
//     //                 }else{
//     //                     console.log("state change")
//     //                 }
//     //             })
    

    
//     // .then(
           
//     //         .then(
                
//     //             .catch((e) =>{
//     //                 const error = e.message;
//     //                 res.json({error: error})
//     //             })
//     //         ).catch((e) =>{
//     //                 const error = e.message;
//     //                 res.json({error: error})
                    
//     //         })
//     // ).catch((e) =>{
                    
//     // })

// })  



module.exports = auth;