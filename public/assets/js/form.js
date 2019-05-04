console.log("inside form.js");

$("#submitButton").on("click", function(event){
    event.preventDefault();

    userInput = $("#itemInput").val();

    thisIngredient = $("<div>").addClass("ingredient");
    thisName = $("<div>").text(userInput).addClass("ingredientName");
    thisRemove = $("<button>").text("X").addClass("deleteIngredient");

    thisIngredient.append(thisRemove, thisName);

    $("#ingredients").append(thisIngredient);

    $("#itemInput").val("");

    allowDelete();
})

function allowDelete(){
    $(".deleteIngredient").on("click", function(){
        console.log("delete button");
        
        thisParent = $(this).parent();

        thisParent.remove();
    });
};

$("#search").on("click", function(){
    searchRecipes();
})

function searchRecipes(){
    console.log("searching for recipes")

    ingredientsObject = {};
    allIngredients = [];

    $(".ingredientName").each(function(index){
        thisIngredient = $(this);
        allIngredients.push(thisIngredient.text());
    });

    ingredientsObject.allIngredients = allIngredients;

    console.log(ingredientsObject);

    callApi(ingredientsObject);
};

function callApi(ing){
    $.post("/submit", ing, function(data){
        if(data){
            console.log("data has been posted");
        }
    })
}

$("#testing").on("click", function(){
    console.log("testing views");
});