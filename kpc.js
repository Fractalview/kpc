// DEPENDENCIES
var express    = require("express"),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
methodOverride = require("method-override");

// REQUIRING ROUTES
var indexRoutes = require("./routes/index");
var kontaktRoutes = require("./routes/kontakt");
var onamaRoutes = require("./routes/o-nama");
var prezentacijaRoutes = require("./routes/prezentacija");
var pogonRoutes = require("./routes/pogon");
var proizvodiRoutes = require("./routes/proizvodi");
var kapacitetiRoutes = require("./routes/kapaciteti");

// CONNECTING TO A DB USING ENVIRONMENT VARIABLE
// mongoose.connect(process.env.DATABASEURL);

// CONNECTING TO LOCAL MONGODB
// mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });

// CONNTECTING TO mLab (MONGODB HOSTING SITE)
// mongoose.connect("mongodb://Alkaloid:diolakla@ds033186.mlab.com:33186/gagassweetcakes", { useMongoClient: true });


// APP MIDDLEWARE SETUP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// SETTING THE ROUTES
app.use("/", indexRoutes);
app.use("/kontakt", kontaktRoutes);
app.use("/o-nama", onamaRoutes);
app.use("/prezentacija", prezentacijaRoutes);
app.use("/pogon", pogonRoutes);
app.use("/proizvodi", proizvodiRoutes);
app.use("/kapaciteti", kapacitetiRoutes);

// SETTING THE PORT
// app.set('port', (process.env.PORT || 5000));

// AVOIDING HEROKU $PORT ERROR
// app.get('/', function(request, response) {
//     var result = 'App is running'
//     response.send(result);
// }).listen(app.get('port'), function() {
//     console.log('App is running, server is listening on port ', app.get('port'));
// });

// STARTING THE APP ON A LOCAL SERVER
app.listen(3000, function () {
    console.log("KPC server has started!");
});