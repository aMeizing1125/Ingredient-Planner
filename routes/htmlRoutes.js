var db = require("../models");
var getRecipes = require("../public/assets/js/findRecipes");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/form", function(req, res) {
    res.render("form");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.post("/submit", function(req, res){
    allIngredients = req.body;
  
    var allRecipes;
  
    getRecipes(allIngredients.allIngredients, function(response){
      console.log(response);
      
      res.json(response);
    });
  
  
    console.log(allRecipes);
  })
};
