const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const iterations = 90000;
const keylen = 32;
const saltBytes = 16;
const digest = "sha512";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(saltBytes).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, keylen, digest)
    .toString("hex");
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, keylen, digest)
    .toString("hex");

  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  let expires = new Date().getTime() + weekMs;

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
      exp: expires,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
    }
  );
};

const User = mongoose.model("User", UserSchema);
User.createIndexes();

module.exports = User;
