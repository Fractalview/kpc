
var express   = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
Campground    = require("./models/campground"),
Comment       = require("./models/comment"),
seedDB        = require("./seeds.js"),
passport      = require("passport"),
LocalStrategy = require("passport-local"),
User          = require("./models/user"),
methodOverride = require("method-override"),
flash          = require("connect-flash")

// requiring routes
var commentRoutes = require("./routes/comments"),
campgroundRoutes  = require("./routes/campgrounds"),
indexRoutes       = require("./routes/index")


// mongoose.connect(process.env.DATABASEURL);

// local DB!
// mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });

mongoose.connect("mongodb://Alkaloid:diolakla@ds111804.mlab.com:11804/ayelpcamp", { useMongoClient: true });
// mongodb://Alkaloid:diolakla@ds111804.mlab.com:11804/ayelpcamp
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//seed the database
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "terces",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


// app.listen(3000, function () {
//     console.log("YelpCamp server has started!");
// });