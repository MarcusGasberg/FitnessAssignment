const mongoose = require("mongoose");
const crypto = require("crypto");
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
  name: {
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

const User = mongoose.model("User", UserSchema);
User.ensureIndexes();

module.exports = User;
