function htmlRoutes(app){
    app.get("/", function(req, res) {
        res.render("index");
    });
    app.get("/form", function(req, res) {
        res.render("form");
    });
}

module.exports = htmlRoutes;