var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-out", function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/");
});


router.post("/authenticate", async function (req, res, next) {
  if(!req.body.username || req.body.password){
    res.status(400)
    .json({ message: "Username and Password are required"});;
  }

  const User = mongoose.model("User");
  const u = await User.findOne({ username: req.body.username });

  if (u) {
    const pwd = "" + req.body.password;
    const valid = u.validatePassword(pwd);
    if (valid) {
      const token = u.generateJwt();
      res.status(200).json({token});
    }
  }
  
  res.status(401);
});

router.post("/register", async function (req, res, next) {
  if(!req.body.username || req.body.password){
    res.status(400)
    .json({ message: "Username and Password are required"});;
  }

  const User = mongoose.model("User");
  const u = await User.findOne({ username: req.body.username });

  if (u) {
    res.status(403).json({ message: "Username is already taken"});
  } else {
    const user = new User(req.body);
    user.setPassword("" + req.body.password);
  
    await user.save((err) => {
      if(err) {
        res.status(400).json({ message : err });
      } else {
        res.status(200);
      }
    });
  }
});

module.exports = router;
