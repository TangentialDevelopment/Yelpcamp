var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
  {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60"},
  {name: "Granite Hill", image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=500&q=60"},
  {name: "Stoney Creek", image: "https://images.unsplash.com/photo-1533597818151-d1071f26fe32?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d801e2dda51c0d284878778edf9172a1&auto=format&fit=crop&w=500&q=60"}
]


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

app.get("/", function(req, res) {
   res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs")
});

app.post("/campgrounds", function(req, res) {
  //getting data
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);

  res.redirect("/campgrounds");
});

app.listen(3000, process.env.PORT, process.env.IP, function () {
console.log("YelpCamp initialized on port 3000");
});
