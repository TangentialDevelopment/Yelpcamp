var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    mongoose          = require("mongoose"),
    flash             = require("connect-flash"),
    methodOverride    = require("method-override"),
    Campground        = require("./models/campground"),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    seedDB            = require("./seeds");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.connect("mongodb://test:test123@ds111063.mlab.com:11063/testyelpcamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// =========================================================================
// passport config
// =========================================================================
app.use(require("express-session")({
  secret: "74528jhmk",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(3000, process.env.PORT, process.env.IP, function () {
console.log("YelpCamp initialized on port 3000");
});
