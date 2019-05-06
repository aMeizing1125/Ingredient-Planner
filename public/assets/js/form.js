console.log("inside form.js");

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
        console.log(thisRecipe.title);

        recipeDiv = $("<div>").addClass("recipe");

        title = $("<div>").text(thisRecipe.title)
            .addClass("recipeTitle");

        recipeContainer = $("<div>").addClass("recipeContainer");

        image = $("<img>").attr("src", thisRecipe.image);

        //Recipe details
        details = $("<div>").addClass("recipeDetails")
        
        moreDetails = $("<button>").addClass("moreDetails").text("More Details");
        
        details.append(moreDetails);

        recipeContainer.append(image, details);
        recipeDiv.append(title, recipeContainer);

        $("#results").append(recipeDiv);
    })

    allowMoreDetails();
}

function allowMoreDetails(){
    $(".moreDetails").on("click", function(){
        console.log("more details");
        
        thisButton = $(this).parent().parent().parent();
    
        thisButton.toggleClass("expand");
    })
}