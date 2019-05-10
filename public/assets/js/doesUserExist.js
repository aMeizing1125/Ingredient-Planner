var updateUi = {
    //Creates a dropdown menu for logged in user
    createDropDown: function (thisUser) {
        $(".about").empty();

        //Dropdown menu
        newDropDown = $("<select>").addClass("userDropDown")
            .attr("onchange", "updateUi.dropDownOptions(this.value)");

        //This will let us set the default option to the user's name
        userName = $("<option>").text(thisUser.displayName)
            .attr("disabled", "true")
            .attr("selected", "true")
            .attr("hidden", "true")
            .addClass("userName");

        signOut = $("<option>").text("Sign Out")
            .attr("id", "signOut")
            .attr("value", "signOut");
        myRecipes = $("<option>").text("My Recipes")
            .attr("value", "myRecipes");

        newDropDown.append(userName, signOut, myRecipes);

        $(".about").append(newDropDown);
    },
    dropDownOptions(value) {
        console.log(value);
        //If user attempts to sign out
        if (value === "signOut") {
            //Clears indexedDb

            firebase.auth().signOut().then(function () {
                console.log('Signed Out');
            }, function (error) {
                console.error('Sign Out Error', error);
            });

            //Clears local storage
            localStorage.clear();
           
            //Reload page
            location.reload();
        }
        else if (value === "myRecipes"){
            window.location.href = "/my_recipes";
        }

    }

}


function validateUser(){
    var userAccount = JSON.parse(localStorage.getItem("firebaseui::rememberedAccounts"));

    if(userAccount){
      //Stores the object of the current user
      thisUser = userAccount[0];
  
      //Create dropdown menu for user
      updateUi.createDropDown(thisUser);

      //Store uid in local storage
        getUserId(function(response){
            localStorage.setItem('uid', JSON.stringify(response));
        });
    }

}

function getUserId(callback){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            uid = user.uid
    
            callback(uid);
        } 
        
        else {
            console.log("user is not logged in");
        }
    });     
}

validateUser();