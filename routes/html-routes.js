function htmlRoutes(app){
    //Home
    app.get("/", function(req, res) {
        res.render("index");
    });
    //Form
    app.get("/form", function(req, res) {
        res.render("form");
    });
    //My Recipes
    app.get("/my_recipes", function(req, res){
        res.render("my_recipes");
    });
}

module.exports = htmlRoutes;