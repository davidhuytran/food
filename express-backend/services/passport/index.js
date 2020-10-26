const passport = require("passport");
const localStrategy = require("./localPassport");
const { User } = require("../../db/models");

passport.serializeUser((user, done) => {
  //Storing user.id
  done(null, user.id);
});

//Callback the id we stored
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(localStrategy);

module.exports = passport;
