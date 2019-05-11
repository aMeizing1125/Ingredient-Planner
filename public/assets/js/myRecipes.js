console.log("inside myRecipes.js");

var uid = JSON.parse(localStorage.getItem('uid'));

function renderMyRecipes(){
    uidObject = {};
    uidObject.uid = uid;

    //Gets back an array of recipe_id's that the user has saved
    $.post("/api/my_recipes", uidObject, function(data){
        if(data){
            for(i = 0; i < data.length; i++){
                thisId = data[i];
                
                searchById(thisId);
            }
        }
    })

    //Allow Delete
    // allowDelete();  

}

//Takes in a recipe id, returns a recipe object from Spoonacular API
function searchById(id){
    idObject = {};
    idObject.id = id;

    $.post("/api/searchById", idObject, function(data){
        if(data){
            console.log(data);
            formatRecipe(data);
        }
    });
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

    deleteRecipe = $("<button>")
    .addClass("deleteRecipe")
    .data("id", recipe.id)
    .text("Delete Recipe")
    .attr("onClick", `allowDelete(${recipe.id})`);

    footer.append(deleteRecipe);

    thisRecipeDiv.append(header, body, footer);

    $("#myRecipes").append(thisRecipeDiv);
}

renderMyRecipes();

function allowDelete(id){
    idObject = {};
    idObject.recipeId = id;
    idObject.uid = uid;

    $.post("/api/deleteRecipe", idObject, function(data){
        if(data){
            console.log(data);
        }
    })

    //Remove the parent of deleted recipe
    $(`#${id}`).remove();
}