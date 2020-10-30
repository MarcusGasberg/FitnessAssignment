require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var programRouter = require("./routes/programs");
var signUpRouter = require("./routes/sign-up");
var signInRouter = require("./routes/sign-in");
var mongoose = require("mongoose");
var db = require("./models/fitness-db");
var partials = require("express-partials");
var jwt = require("jsonwebtoken");

partials.register(".ejs", "ejs");

var app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.use(async function (req, res, next) {
  if (req.cookies.jwt) {
    try {
      var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    } catch (e) {
      return;
    }

    const User = mongoose.model("User");
    const user = await User.findOne({ _id: decoded._id });
    req.user = user;
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/programs", programRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  next(createError(400));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (err.name === "UnauthorizedError") {
    res.redirect("./sign-in");
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
