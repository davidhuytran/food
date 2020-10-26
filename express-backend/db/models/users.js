const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const usersDB = new Schema({
  email: String,
  password: String,
});

usersDB.methods = {
  validatePassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

module.exports = mongoose.model("Users", usersDB);
