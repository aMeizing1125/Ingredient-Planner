var getRecipes = require("../public/assets/js/findRecipes");

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
}

module.exports = apiRoutes;