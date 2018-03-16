// DEPENDENCIES
var express   = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
methodOverride = require("method-override");
// var fs = require("fs"),
// http = require("http"),
// url = require("url"),
// path = require("path");

// REQUIRING ROUTES
var indexRoutes = require("./routes/index");
var kontaktRoutes = require("./routes/kontakt");
var onamaRoutes = require("./routes/o-nama");
var prezentacijaRoutes = require("./routes/prezentacija");
var pogonRoutes = require("./routes/pogon");
var proizvodiRoutes = require("./routes/proizvodi");


// CONNECTING TO A DB USING ENVIRONMENT VARIABLE
// mongoose.connect(process.env.DATABASEURL);

// CONNECTING TO LOCAL MONGODB
// mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });

// CONNTECTING TO mLab (MONGODB HOSTING SITE)
// mongoose.connect("mongodb://Alkaloid:diolakla@ds033186.mlab.com:33186/gagassweetcakes", { useMongoClient: true });


// APP MIDDLEWARE SETUP
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.use(methodOverride("_method"));
// app.use(flash());
app.set("view engine", "ejs");

// SEED THE DB
/*seedDB();*/

// PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "terces",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// SETTING THE CURRENT USER AND FLASH MESSAGES
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

// SETTING THE ROUTES
app.use("/", indexRoutes);
app.use("/kontakt", kontaktRoutes);
app.use("/o-nama", onamaRoutes);
app.use("/prezentacija", prezentacijaRoutes);
app.use("/pogon", pogonRoutes);
app.use("/proizvodi", proizvodiRoutes);


/* app.get('/prezentacija', function(req, res) {
    const path = 'public/garaza-skoplje.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'prezentacija/mp4',
      }
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'prezentacija/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
}); */

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