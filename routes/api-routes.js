var getRecipes = require("../public/assets/js/findRecipes");

var storeRecipe = require("../public/assets/js/storeRecipe.js");

function apiRoutes(app){
    app.post("/submit", function(req, res){
        allIngredients = req.body;
      
        var allRecipes;
      
        getRecipes(allIngredients.allIngredients, function(response){
          console.log(response);
          
          res.json(response);
        });
      
        console.log(allRecipes);
    });

    app.post("/saveRecipe", function(req, res){
      thisRecipe = req.body;

      console.log(thisRecipe);
    })
}

module.exports = apiRoutes;