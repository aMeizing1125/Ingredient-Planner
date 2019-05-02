// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log(authResult);
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,

    //stretch goal is to use all of these. 
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  // Other config options...
}


ui.start('#firebaseui-auth-container', uiConfig);

//this works if any user tries to login or logout. 
//because the onAuthStateChaned means both login or logout. 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //you can switch style.display to initial if it doesn't break the style
    //do it for both if user login or logout
    document.getElementById('loginDiv').style.display = "block";
    document.getElementById('logoutDiv').style.display = "none";

    var user = firebase.auth().currentUser;

    if (user != null) {
      
      var email_id = user.email; 

      document.getElementById('logoutP').innerHTML = "Welcome Foodie : " + email;

    }


  } else {
    // No user is signed in.
    document.getElementById('loginDiv').style.display = "none";
    document.getElementById('logoutDiv').style.display = "block";

  }
}); //end of firebase.auth()

function login() {
  // this is here to test the function only
  // window.alert("login() working! ");

  var userEmail = document.getElementById('emailInput').value;
  var userPassword = document.getElementById('passwordInput').value;

  //testing if userEmail and userPassword is actually capturing. 
  // window.alert(userEmail + " " + userPassword);

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert('Error : ' + errorMessage);
    // ...
  });
} //end of login()

function logout() {
  firebase.auth().signOut()

  // tutorial deleted -commenting out is better
  // .then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });



}