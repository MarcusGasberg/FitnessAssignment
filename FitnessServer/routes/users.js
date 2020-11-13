var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-out", function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/");
});

router.post("/authenticate", async function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username and Password are required" });
    return;
  }

  const User = mongoose.model("User");
  const u = await User.findOne({ username: req.body.username });

  if (u) {
    const pwd = "" + req.body.password;
    const valid = u.validatePassword(pwd);
    if (valid) {
      const token = u.generateJwt();
      res.status(200).json(u);
      return;
    }
  }

  res.status(401);
});

router.post("/register", async function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username and Password are required" });
    return;
  }

  const User = mongoose.model("User");

  const user = new User(req.body);
  user.setPassword("" + req.body.password);

  await user.save((err, doc) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(403).send({ message: "User already exist!" });
      }
    } else {
      res.status(200).json(doc);
    }
  });
});

module.exports = router;
