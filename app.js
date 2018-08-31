var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
//     description: "large granite hill, no bathrooms, no water. just rock"
//   }, function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(campground);
//     }
//   });

// var campgrounds = [
//   {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60"},
//   {name: "Granite Hill", image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=500&q=60"},
//   {name: "Stoney Creek", image: "https://images.unsplash.com/photo-1533597818151-d1071f26fe32?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d801e2dda51c0d284878778edf9172a1&auto=format&fit=crop&w=500&q=60"}
// ]

app.get("/", function(req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({},function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  });
});

app.post("/campgrounds", function(req, res) {
  //getting data
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
  // campgrounds.push(newCampground);
  Campground.create(newCampground, function(err, newCreated) {
    if (err) {
      console.log(err)
    } else {
      console.log(newCreated)
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// shows more info about a specific campground
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground:foundCampground});
    }
  });
});

// Comment routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments/", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          console.log(comment);
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

app.listen(3000, process.env.PORT, process.env.IP, function () {
console.log("YelpCamp initialized on port 3000");
});
