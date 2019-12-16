window.addEventListener('DOMContentLoaded', (event) => {
    console.log('content loaded')

    const status = document.querySelector('#status p')

    auth.onAuthStateChanged((user) => {
        if (user) {
            status.innerHTML = 
                `<h4>logged in</h4>
                <p>${user.email}</p>
                `
                console.log(user)

        } else {
            status.innerHTML = 'user logged out'
        }
    })

    //sign up with email/password
    const signUpWithEmailButton = document.querySelector('#signup-email-password button')
    const signUpEmail = document.querySelector('#signup-email-password input[type=email]')
    const signUpPass = document.querySelector('#signup-email-password input[type=password]')

    signUpWithEmailButton.addEventListener('click', () => {
        if(!signUpEmail.checkValidity()){
            signUpEmail.placeholder = 'please fill in a correct email'
            return
        }
        auth.signUpWithEmailAndPassword(signUpEmail, signUpPass)
        
    })
    //Google auth example
    const signInWithGoogleButton = document.querySelector('#sign-in-with-google button')

    signInWithGoogleButton.addEventListener('click', () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        // To apply the default browser preference instead of explicitly setting it.
        firebase.auth().useDeviceLanguage()

        provider.addScope('profile')
        provider.addScope('email')
        firebase.auth().signInWithRedirect(provider);
    })

    //sign out
    const signOutButton = document.querySelector('#sign-out button')
    signOutButton.addEventListener('click', () => {
        auth.signOut()
    })
});