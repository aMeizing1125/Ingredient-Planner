console.log("inside form.js");

//Global functions--------------------------------------------------------------------
function allowSave(id){
    

    console.log(id);

    var uid = JSON.parse(localStorage.getItem('uid'));

    if(uid){

        recipeObject = {};
        recipeObject.uid = uid;
        recipeObject.recipeId = id;

        console.log(recipeObject);

        $.post("/saveRecipe", recipeObject, function(data){
            if(data){
                console.log(data);
            }
            console.log("recipe has been saved");
        })
    }

    else{
        alert("user is not logged in");
    }     
        
}

//------------------------------------------------------------------------------------

$("#submitButton").on("click", function(event){
    event.preventDefault();

    userInput = $("#itemInput").val();
    if (!userInput) {
        return;
    }
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

    getIds(ingredientsObject);
};

function getIds(ing){
    $.post("/submit", ing, function(data){
        if(data){
            getRecipes(data);
        }
    })
}

function getRecipes(idArray){

    console.log(idArray);

    for(i = 0; i < idArray.length; i++){
        thisId = idArray[i];

        idObject = {};
        idObject.id = thisId

        $.post("/api/searchById", idObject, function(data){
            if(data){
                console.log(data);
                formatRecipe(data);
            }
        });
    }

}

function formatRecipe(recipe){
    thisRecipeDiv = $("<div>").addClass("savedRecipe").attr("id", recipe.id);
    //Header-----------------------------------------------
    header = $("<div>").addClass("recipeHeader");

    headerTitle = $("<div>").text(recipe.title).addClass("recipeTitle");

    header.append(headerTitle);

    body = $("<div>").addClass("recipeBody");

    recipeStats = $("<div>").addClass("recipeStats");
    diets = $("<div>").addClass("diets");
    dietsTitle = $("<div>").addClass("dietsTitle").text("Diets:");
    dietsContent = $("<div>").addClass("dietsContent");

    allDiets = recipe.diets;

    allDiets.forEach(function(thisDiet){
        dietName = $("<div>").text(thisDiet).addClass("dietName");
        dietsContent.append(dietName);
    })

    diets.append(dietsTitle, dietsContent);

    recipeImage = $("<img>").attr("src", recipe.image).addClass("recipeImage");

    recipeStats.append(diets, recipeImage);

    recipeInstructions = $("<div>").addClass("recipeInstructions");

    recipeIngredients = $("<div>").addClass("recipeIngredients");

    ingredientsTitle = $("<div>").addClass("ingredientsTitle").text("Ingredients:");

    headerRow = $("<hr>");

    recipeIngredients.append(ingredientsTitle, headerRow);

    allIngredients = recipe.extendedIngredients;

    allIngredients.forEach(function(ingredient){
        ingredientString = $("<div>").addClass("ingredientName").text("- " + ingredient.originalString);
        recipeIngredients.append(ingredientString);
    })

    instructionsDiv = $("<div>").addClass("instructionsDiv");
    
    instructionsTitle = $("<div>").addClass("instructionsTitle").text("Recipe Instructions:");

    instructionsHr = $("<hr>");

    //This is where the recipe instructions will go
    instructionsContent = $("<div>").addClass("instructionsContent");

    allSteps = recipe.analyzedInstructions[0].steps;

    allSteps.forEach(function(step, i){
        thisStep = $("<div>").addClass("instructionStep").text((i + 1) + ":  " + step.step);
        thisBreak = $("<br>");
        instructionsContent.append(thisStep, thisBreak);
    })

    instructionsDiv.append(instructionsTitle, instructionsHr, instructionsContent);

    recipeInstructions.append(recipeIngredients, instructionsDiv);

    body.append(recipeStats, recipeInstructions);

    footer = $("<div>").addClass("recipeFooter");

    saveRecipe = $("<button>")
    .addClass("saveRecipe")
    .text("Save Recipe")
    .attr("onClick", `allowSave(${recipe.id})`);

    footer.append(saveRecipe);

    thisRecipeDiv.append(header, body, footer);

    $("#results").append(thisRecipeDiv);
}