var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var cat = require("");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // cat.all(function(data) {
    var hbsObject = {
      ingredients: []
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  // });
});

router.get("/test", function(req, res) {
    res.render("./test", hbsObject);
});




module.exports = router;