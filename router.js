var express = require("express");
var router = express.Router();

const credential = require("./users.json");

// const credential = {
//   email: "admin@gmail.com",
//   password: "admin123",
// };

router.use(function timeLog(req, res, next) {
  console.log("Time:,", Date.now());
  next();
});
//login_user
router.post("/login", (req, res) => {
  const user = credential.find((item) => item.email === req.body.email && item.password === req.body.password);

  if (user) {
    req.session.user = req.body.email;
    res.redirect("/projects");
  } else {
    res.end("Invalid Email or Password");
  }
});

router.post("/signup", (req, res) => {
  const { email, password, username, full_name } = req.body;

  const id = credential[credential.length - 1].id + 1;
  const post = {
    id,
    email,
    password,
    username,
    full_name,
  };
  credential.push(post);
  // res.status(200).redirect("/signin");
  res.render("signin", {
    layout: "./layouts/main-layout",
    title: "Signin",
    signup: "SignUp Success! Please Login.",
  });
});

router.get("/signup", (req, res) => {
  res.status(200).json(credential);
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("signin", {
        layout: "./layouts/main-layout",
        title: "SignIn",
        logout: "Logout Success!",
      });
    }
  });
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "Fail",
    errors: err.message,
  });
});

router.use((req, res, next) => {
  res.status(404).json({
    status: "Fail",
    errors: "Error 404",
  });
});

module.exports = router;
