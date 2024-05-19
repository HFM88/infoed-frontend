const express = require("express");

let acasa = {};

acasa.start = async function () {
  acasa.router = express.Router();
};

acasa.init = function (app, collection) {
  acasa.router.get("/home", (req, res) => {
    res.render("home.ejs", { currentRoute: 'home' }); // Pass the current route as a variable
  });
  acasa.router.get("/post", (req, res) => {
    res.render("post.ejs", { currentRoute: 'post' });
  });
  acasa.router.get("/notifications", (req, res) => {
    res.render("notifications.ejs", { currentRoute: 'notifications' });
  });
  acasa.router.get("/auth", (req, res) => {
    res.render("auth.ejs", { currentRoute: 'auth' });
  });
  acasa.router.get("/messages", (req, res) => {
    res.render("messages.ejs", { currentRoute: 'messages' });
  });
  acasa.router.get("/search", (req, res) => {
    res.render("search.ejs", { currentRoute: 'search' });
  });
  acasa.router.get("/profile", (req, res) => {
    res.render("profile.ejs", { currentRoute: 'profile' });
  });
  acasa.router.get("/settings", (req, res) => {
    res.render("settings.ejs", { currentRoute: 'settings' });
  });
  acasa.router.get("/", (req, res) => {
    res.redirect("/home");
  });

  app.use("/", acasa.router);
};


module.exports = acasa;
