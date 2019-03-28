import axios from 'axios';
import $ from 'jquery'
module.exports = {

renderSignupForm : () => {
    $('.mainContainer').html('<div>
                <div class="logoContainer">
        <img src="images/logo1.png" class="logoImage"/>
        </div>

        <div class="formContainer cf-column">
        <form class="signUpForm">
            <input class="formInput"
            type="text" 
            placeholder="Full Name" 
            name="user_fullName"
            required
                />
                <input class="formInput"
                type="email" 
                placeholder="Email Address" 
                name="user_email"
                required
                />
                <input class="formInput"
                type="password" 
                placeholder="Choose a Password" 
                name="user_password"
                required
                />
        <input type="submit" value="Sign In" class="buttonDefault" 
        disabled="true"/>
        </form>
        </div>
        </div>');

},


renderUser : () =>{
    $('.mainContainer').html('<div>efwsc</div>'
    );
}



}