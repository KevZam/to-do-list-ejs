const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Foood"];
const workItems = [];

// allow body parser to parse post data correctly
app.use(bodyParser.urlencoded({ extended: true }));

// allow the ejs files to access the stylesheet and any other attachments we use
app.use(express.static("public"));

// enable ejs, will look in the "views" folder by default
app.set("view engine", "ejs");

// render our homepage list
app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

// Here we check for the name of the list in the list title. Apparently listTitle in the get below
// doesn't read spaces so we check for Work instead of Work List
app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log(req.body.list);
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

// get the /work page list and load it with a blank workItems array
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
