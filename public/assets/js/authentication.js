// console.log("working");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCEaSRawNZKU_TSSbQCjQihj7rAm3qnFU4",
  authDomain: "ingredients-planner.firebaseapp.com",
  databaseURL: "https://ingredients-planner.firebaseio.com",
  projectId: "ingredients-planner",
  storageBucket: "ingredients-planner.appspot.com",
  messagingSenderId: "1000035841774"
};

firebase.initializeApp(config);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());


var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log(authResult);


      // updateUi.createDropDown(authResult.user);
      //Reload page
      location.reload();

      return false;
    },
    uiShown: function () {
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

function validateUser(){
  var userAccount = JSON.parse(localStorage.getItem("firebaseui::rememberedAccounts"));

  if(userAccount){
    //Stores the object of the current user
    thisUser = userAccount[0];

    //Remove sign in option
    updateUi.removeSignin();

    //Create dropdown menu for user
    updateUi.createDropDown(thisUser);
  }

  //If the user does not exist
  else{
    $("#signIn").on("click", function(){
      $(".hide").toggleClass("hide");
    })

  }
}

validateUser();