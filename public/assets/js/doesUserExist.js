var updateUi = {
    //Creates a dropdown menu for logged in user
    createDropDown: function (thisUser) {
        $(".about").empty();

        //Dropdown menu
        newDropDown = $("<select>").addClass("userDropDown")
            .attr("onchange", "updateUi.dropDownOptions(this.value)")

        //This will let us set the default option to the user's name
        userName = $("<option>").text(thisUser.displayName)
            .attr("disabled", "true")
            .attr("selected", "true")
            .attr("hidden", "true")
            .addClass("userName");

        signOut = $("<option>").text("Sign Out")
            .attr("id", "signOut")
            .attr("value", "signOut");
        settings = $("<option>").text("Settings")
            .attr("value", "settings");

        newDropDown.append(userName, signOut, settings);

        $(".about").append(newDropDown);
    },
    dropDownOptions(value) {
        console.log(value);
        if (value === "signOut") {
            //Clears indexedDb
            firebase.auth().signOut().then(function () {
                console.log('Signed Out');
            }, function (error) {
                console.error('Sign Out Error', error);
            });

            //Clears local storage
            localStorage.clear();
        }

        // Simulate an HTTP redirect:
        window.location.replace("/");

    }


}


function validateUser() {
    var userAccount = JSON.parse(localStorage.getItem("firebaseui::rememberedAccounts"));

    if (userAccount) {
        //Stores the object of the current user
        thisUser = userAccount[0];

        //Create dropdown menu for user
        updateUi.createDropDown(thisUser);
    }


}

validateUser();