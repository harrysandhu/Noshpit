import {StyleSheet, css} from 'aphrodite';


export const defaultStyles = StyleSheet.create({


    containerFlex : {
        height:'100%',
        width:'100%',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',


    
    },


    logoImage : {
        width: '250px',
        height: 'auto',
    },

    logoContainer : {
        marginBottom: '5%',
    },


    formContainer : {
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:'40px',
        marginBottom: '30px'
    },

    
    formInput : {
        border: 'none',
        display:'block',
        width:'200px',
        marginBottom: '5px',
        backgroundColor:'#F2F2F2',
        paddingLeft:'25px',
        paddingRight: '25px',
        paddingTop: '17px',
        paddingBottom: '17px',
        fontSize: '14px',
        '::placeholder': {
            fontSize: '14px',
        },
        ':focus': {
            outline: 'none',
            boxShadow: '0px 0px 56px 9px rgba(0,0,0,0.28)',
        }
    },

    buttonDefault: {
        width: '250px',
        border: 'none',
        backgroundColor: '#1db954',
        paddingLeft:'20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        color:'white',
        fontSize: '14px',
        cursor: 'pointer',
         ':hover': {
            outline: 'none',
            boxShadow: '0px 0px 56px 9px rgba(0,0,0,0.28)',
        },
        ':focus' : {
            outline: 'none'
        },
        transition: '.5s',

        ':disabled': {
            backgroundColor: '#a0a0a0',
             cursor: 'not-allowed',
              ':hover': {
                outline: 'none',
                boxShadow: 'none',
            },
        }
    
    },


    buttonBlack : {
        backgroundColor : '#000',
        ':hover': {
            outline: 'none',
            boxShadow: '0px 0px 56px 9px rgba(0,0,0,0.28)',
        },
        ':focus' : {
            outline: 'none'
        },
        transition: '.5s'
    },
    optionsContent : {
        marginTop: '40px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    }






})



