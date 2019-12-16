window.addEventListener('DOMContentLoaded', (event) => {
    console.log('content loaded')

    const status = document.querySelector('#status p')

    auth.onAuthStateChanged((user) => {
        console.log('auth state', user)
        if (user) {
            status.innerHTML =
                `<h4>logged in</h4>
                <p>${user.email}</p>
                `
        } else {
            status.innerHTML = 'user logged out'
        }
    })

    //sign up with email/password
    const signUpWithEmailButton = document.querySelector('#signup-email-password button')
    const signUpEmail = document.querySelector('#signup-email-password input[type=email]')
    const signUpPass = document.querySelector('#signup-email-password input[type=password]')

    signUpWithEmailButton.addEventListener('click', () => {
        if (!signUpEmail.checkValidity()) signUpEmail.style.border = '1px dashed orange'
        if (!signUpPass.checkValidity()) signUpPass.style.border = '1px dashed orange'
        if (signUpEmail.checkValidity() && signUpPass.checkValidity())
            auth.createUserWithEmailAndPassword(signUpEmail.value, signUpPass.value)
            .then(() => {
                signUpEmail.value = ''
                signUpPass.value = ''
            })
            .catch(function (error) {
                status.innerHTML =
                    `<h4>${error.code}</h4>
                <p>${error.message}</p>
                `
            })
    })

    //sign IN with email/password
    const signInWithEmailButton = document.querySelector('#login-email-password button')
    const loginEmail = document.querySelector('#login-email-password input[type=email]')
    const loginPass = document.querySelector('#login-email-password input[type=password]')

    signInWithEmailButton.addEventListener('click', () => {
        if (!loginEmail.checkValidity()) loginEmail.style.border = '1px dashed orange'
        if (!loginPass.checkValidity()) loginPass.style.border = '1px dashed orange'
        if (loginEmail.checkValidity() && loginPass.checkValidity())
            auth.signInWithEmailAndPassword(loginEmail.value, loginPass.value)
            .then(() => {
                loginEmail.value = ''
                loginPass.value = ''
            })
            .catch(function (error) {
                status.innerHTML =
                    `<h4>${error.code}</h4>
                <p>${error.message}</p>
                `
            })
    })


    //Google auth example
    const signInWithGoogleButton = document.querySelector('#sign-in-with-google button')

    signInWithGoogleButton.addEventListener('click', () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        // To apply the default browser preference instead of explicitly setting it.
        firebase.auth().useDeviceLanguage()

        provider.addScope('profile')
        provider.addScope('email')

        auth.signInWithRedirect(provider)
            .catch(function (error) {
                status.innerHTML =
                    `<h4>${error.code}</h4>
                  <p>${error.message}</p>
                `
            })
    })

    //sign out
    const signOutButton = document.querySelector('#sign-out button')
    signOutButton.addEventListener('click', () => {
        auth.signOut()
    })
});