var unirest = require("unirest");

var calls = {
    recipeInfo: function(id, callback){
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + thisId + "/information")
        .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "d6a9b5bffdmsh9385d0d809f8dbap14182djsnc502b11e028b")
        .end(function (result) {
            callback(result.body);
        });
    }
}

module.exports = calls;