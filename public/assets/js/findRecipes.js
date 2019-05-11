var unirest = require("unirest");

function createUrl(arr){
    queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=1&ignorePantry=false&ingredients=";

    for(i = 0; i < arr.length; i++){
        thisIngredient = arr[i];
        thisIngredient += "%2C";
        
        queryUrl += thisIngredient;
    }

    return queryUrl;
}

var getRecipes = function(ingredients, callback){
    thisUrl = createUrl(ingredients);

    unirest.get(thisUrl)
    .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "d6a9b5bffdmsh9385d0d809f8dbap14182djsnc502b11e028b")
    .end(function (result) {
        recipeIdArray = [];
        for (i = 0; i < result.body.length; i++){
            recipeIdArray.push(result.body[i].id);
        }

        callback(recipeIdArray);
    });
    console.log("Mei testing" + getRecipes);
}

module.exports = getRecipes;