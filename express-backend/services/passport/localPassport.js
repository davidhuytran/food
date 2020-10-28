const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../db/models')

const localStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (username, password, done) => {
    const userMatch = await User.findOne({ email: username });
    if (!userMatch) {
      return done(null, false, { 
        status: 409,
        msg: 'Incorrect username' 
      });
    }
    if (!userMatch.validatePassword(password)) {
      return done(null, false, {
        status: 410,
        msg: 'Incorrect password' 
      });
    }
    return done(null, userMatch, {
      status: 200,
      msg: "Login Successful"
    });
  });

module.exports = localStrategy