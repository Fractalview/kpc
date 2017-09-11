// DEPENDENCIES
var express = require("express"),
router      = express.Router({mergeParams: true}),
Campground  = require("../models/campground"),
User        = require("../models/user"),
Booking     = require("../models/booking"),
middleware  = require("../middleware"),
passport    = require("passport");

// GETTING A FORM TO BOOK A CAMPGROUND ROUTE
router.get("/book", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/book", { campground: foundCampground, price: req.body.price });
    });
})

// POSTING FORM DATA TO DB ROUTE
router.post("/book", middleware.isLoggedIn, function (req, res) {
    // lookup campgound using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            var campName = campground.name;
            var price = campground.price;
            var firstName = req.body.firstName;
            var lastName = req.body.lastName;
            var email = req.body.email;
            var people = req.body.people;
            var startDate = req.body.startDate;
            var endDate = req.body.endDate;
            // calculate number of days
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(Number(startDate.slice(0,4)), Number(startDate.slice(5,7)), Number(startDate.slice(8)));
            var secondDate = new Date(Number(endDate.slice(0,4)), Number(endDate.slice(5,7)), Number(endDate.slice(8)));
            var days = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
            var total = price * people * days
            var customer = {
                id: req.user._id,
                username: req.user.username
            }

            var newBooking = { campName: campName, price: price, firstName: firstName, lastName: lastName, email: email, people: people, startDate: startDate, endDate: endDate, days: days, total: total, customer: customer };
            // create a new booking and save to DB
            Booking.create(newBooking, function (err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    // redirect back to campgrounds page
                    console.log(newlyCreated);
                    req.flash("success", "You made a booking to  " + campground.name + ' and the total price of your stay is ' + '$' + total + '.');
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

//EXPORTS
module.exports = router;