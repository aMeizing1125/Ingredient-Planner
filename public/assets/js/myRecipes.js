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
}

//Takes in a recipe id, returns a recipe object from Spoonacular API
function searchById(id){
    idObject = {};
    idObject.id = id;

    $.post("/api/searchById", idObject, function(data){
        if(data){
            console.log(data);
        }
    });
}

renderMyRecipes();