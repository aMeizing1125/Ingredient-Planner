var unirest = require("unirest");

var calls = {
    recipeInfo: function(id, callback){
        unirest.get(process.env.unirestURL + thisId + "/information")
        .header("X-RapidAPI-Host", process.env.unirestHOST)
        .header("X-RapidAPI-Key", process.env.unirestKEY)
        .end(function (result) {
            callback(result.body);
        });
    }
}

module.exports = calls;