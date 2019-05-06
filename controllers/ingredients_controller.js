var express = require("express");

var getRecipes = require("../public/assets/js/findRecipes");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var cat = require("");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/form", function(req, res) {
    res.render("form");
});

router.post("/jonathan", function(req, res){
    var thisItem = req.body;

    console.log(thisItem);

    thisItem.whatever += "s";

    res.json(thisItem);    
});

router.get("/myRecipes", function(req, res){
  //If database contains UID
  
})

router.get("/test", function(req, res){
  res.render("test");
})

router.post("/submit", function(req, res){
  allIngredients = req.body;

  var allRecipes;

  getRecipes(allIngredients.allIngredients, function(response){
    console.log(response);
    
    res.json(response);
  });


  console.log(allRecipes);
})

module.exports = router;

function newFunction(allRecipes, response) {
  allRecipes = response;
  return allRecipes;
}