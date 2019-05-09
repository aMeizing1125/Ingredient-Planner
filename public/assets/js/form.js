console.log("inside form.js");

//Global functions--------------------------------------------------------------------


//------------------------------------------------------------------------------------

$("#submitButton").on("click", function(event){
    event.preventDefault();

    userInput = $("#itemInput").val();

    thisIngredient = $("<div>").addClass("ingredient");
    thisName = $("<div>").text(userInput).addClass("ingredientName");
    thisRemove = $("<button>").text("X").addClass("deleteIngredient");

    thisIngredient.append(thisRemove, thisName);

    $("#ingredients").append(thisIngredient);

    $("#itemInput").val("");

    allowDelete();
})

function allowDelete(){
    $(".deleteIngredient").on("click", function(){
        console.log("delete button");
        
        thisParent = $(this).parent();

        thisParent.remove();
    });
};

$("#search").on("click", function(){
    searchRecipes();
})

function searchRecipes(){
    console.log("searching for recipes")

    ingredientsObject = {};
    allIngredients = [];

    $(".ingredientName").each(function(index){
        thisIngredient = $(this);
        allIngredients.push(thisIngredient.text());
    });

    ingredientsObject.allIngredients = allIngredients;

    console.log(ingredientsObject);

    callApi(ingredientsObject);
};

function callApi(ing){
    $.post("/submit", ing, function(data){
        if(data){
            appendResults(data);
        }
    })
}

function appendResults(allRecipes){
    // console.log(allRecipes);
    $("#results").empty();

    allRecipes.forEach(function(thisRecipe){
        console.log(thisRecipe);

        recipeDiv = $("<div>").addClass("recipe");

        title = $("<div>").text(thisRecipe.title)
            .addClass("recipeTitle");

        recipeContainer = $("<div>").addClass("recipeContainer");

        image = $("<img>").attr("src", thisRecipe.image);

        //Recipe details
        details = $("<div>").addClass("recipeDetails")
        
        moreDetails = $("<button>").addClass("moreDetails").text("More Details");

        saveRecipe = $("<button>")
        .addClass("saveRecipe")
        .text("Save Recipe")
        .attr("recipe-id", thisRecipe.id);
        
        details.append(moreDetails, saveRecipe);

        recipeContainer.append(image, details);
        recipeDiv.append(title, recipeContainer);

        $("#results").append(recipeDiv);
    })

    allowMoreDetails();

    saveRecipes();
}

function allowMoreDetails(){
    $(".moreDetails").on("click", function(){
        console.log("more details");
        
        thisButton = $(this).parent().parent().parent();
    
        thisButton.toggleClass("expand");
    })
}

function saveRecipes(){
    $(".saveRecipe").on("click", function(){
        var recipeId;

        thisButton = $(this);
        recipeId = thisButton.attr("recipe-id");

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                uid = user.uid

                console.log(uid);

                savedRecipe = {
                    uid: uid,
                    recipeId: recipeId
                }

                console.log(savedRecipe);

                $.post("/saveRecipe", savedRecipe, function(data){
                    if(data){
                        console.log("recipe has been saved");
                    }
                    else{
                        console.log("error");
                    }
                })
            } 
            
            else {
                console.log("user is not logged in");
            }
        });     
        
        console.log(uid);

    })
}