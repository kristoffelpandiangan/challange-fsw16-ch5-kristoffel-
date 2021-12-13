const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const router = require("./router");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(expressLayout);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/route", router);

app.get("/", (req, res) => {
  res.render("home", {
    layout: "layouts/main-layout",
    title: "Home",
  });
});

app.get("/home", (req, res) => {
  res.render("home", {
    layout: "layouts/main-layout",
    title: "Home",
  });
});

app.get("/people", (req, res) => {
  res.render("people", {
    layout: "layouts/main-layout",
    title: "People",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    layout: "layouts/proj-layout",
    title: "{Projects}",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact",
  });
});

app.get("/project-marcom", (req, res) => {
  res.render("marcom", {
    layout: "layouts/proj-layout",
    title: "Project-Marcom",
  });
});

app.get("/project-markdev", (req, res) => {
  res.render("markdev", {
    layout: "layouts/proj-layout",
    title: "Project-Markdev",
  });
});

app.get("/project-socmed", (req, res) => {
  res.render("socmed", {
    layout: "layouts/proj-layout",
    title: "Project-Socmed",
  });
});

app.get("/signin", (req, res) => {
  res.render("signin", {
    layout: "layouts/main-layout",
    title: "SignIn",
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    layout: "layouts/main-layout",
    title: "SignUp",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "Fail",
    errors: err.message,
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    status: "Error404",
    errors: "Page is not found",
  });
});

app.listen(3000, () => {
  console.log("Apps is running");
});
