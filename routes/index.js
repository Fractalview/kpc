// DEPENDENCIES
var express = require("express"),
router      = express.Router();
// passport    = require("passport"),
// User        = require("../models/user");

// ROOT ROUTE
router.get("/", function (req, res) {
    res.render("home");
});

// SHOW REGISTER FORM
// router.get("/register", function(req, res){
//     res.render("register");
// });

// HANDLE SIGNUP LOGIC
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             req.flash("error", err.message);
//             return res.redirect("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             req.flash("success", "Welcome to CampConnect " + user.username);
//             res.redirect("/cakes")
//         });
//     });
// });

// SHOW LOGIN FORM
// router.get("/login", function(req, res){
//     res.render("login");
// });

// HANDLING LOGIN LOGIC
// router.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/cakes",
//         failureRedirect: "/login"
//     }), function(req, res){
        
// });

// LOGOUT ROUTUE
// router.get("/logout", function(req, res){
//     req.logout();
//     req.flash("success", "Logged you out.");
//     res.redirect("/cakes");
// });

// EXPORTS
module.exports = router;