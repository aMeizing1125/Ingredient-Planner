var unirest = require("unirest");

function createUrl(arr){
    queryUrl = process.env.unirestURL + "findByIngredients?number=20&ranking=1&ignorePantry=false&ingredients=";

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
    .header("X-RapidAPI-Host", process.env.unirestHOST)
    .header("X-RapidAPI-Key", process.env.unirestKEY)
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