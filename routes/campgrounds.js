var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// Index
router.get("/", function(req, res) {
  Campground.find({},function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  });
});

// Create
router.post("/", isLoggedIn, function(req, res) {
  // getting data
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: description, author: author};
  // campgrounds.push(newCampground);
  Campground.create(newCampground, function(err, newCreated) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// New
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// Show
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground:foundCampground});
    }
  });
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
