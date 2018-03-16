// DEPENDENCIES
var express   = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
methodOverride = require("method-override");
router      = express.Router();

// ROOT ROUTE
router.get("/", function (req, res) {
    res.render("proizvodi");
});

// EXPORTS
module.exports = router;