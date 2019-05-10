var getRecipes = require("../public/assets/js/findRecipes");

var orm = require("../config/orm");

var calls = require("../public/assets/js/api/calls");

function apiRoutes(app){
  app.post("/submit", function(req, res){
      allIngredients = req.body;
    
      var allRecipes;
    
      getRecipes(allIngredients.allIngredients, function(response){
        console.log(response);
        
        res.json(response);
      });

      
    
      // console.log(allRecipes);
  });

  app.get("/api/allReceipes", function(req, res){
    orm.selectAll("receipes", function(data){
      res.json(data);
    });
  });

  //Send uid and receipe id into database
  app.post("/saveReceipe", function(req, res){
    thisReceipe = req.body;

    console.log(thisReceipe);

    thisUid = thisReceipe.uid;
    thisReceipeId = thisReceipe.receipeId;

    orm.customInsert(`INSERT INTO receipes (uid, receipe_id) VALUES ('${thisUid}', '${thisReceipeId}');`);
  });

  //Takes in user id, returns array of recipe id's associated with user id
  app.post("/api/my_recipes", function(req, res){
    thisUid = req.body;

    console.log(thisUid);

    orm.customSelect(`SELECT * FROM receipes WHERE uid = '${thisUid.uid}';`, function(response){
      // console.log(response);

      recipeIdArray = [];

      response.forEach(function(thisRecipe){
        recipeIdArray.push(thisRecipe.receipe_id);
      });

      console.log(recipeIdArray);

      res.json(recipeIdArray);
    });
  })

  //Takes in recipe id, returns recipe object
  app.post("/api/searchById", function(req, res){
    thisId = req.body.id;

    console.log("Call API with this id: " + thisId);

    calls.recipeInfo(thisId, function(recipeData){
      res.json(recipeData);
    })

  });

}

module.exports = apiRoutes;