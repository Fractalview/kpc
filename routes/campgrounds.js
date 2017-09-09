// DEPENDENCIES
var express = require("express"),
router      = express.Router(),
Campground  = require("../models/campground"),
middleware  = require("../middleware");


// INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function (req, res) {
    // get all campgrounds from database    
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", { campgrounds: allCampgrounds });
        }
    });
});


// CREATE - ADD A NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, price: price, image: image, description: description, author: author };
    // create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});


// NEW - SHOW FORM TO CREATE A NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});


//SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id", function (req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // redirect to showpage
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

// EXPORTS
module.exports = router;