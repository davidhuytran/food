const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../db/models");

const localStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password,"
    },
    async (username, password, done) => {
        const userMatch = await User.findOne({ email:username })
        if (!userMatch) {
            return done(null, false, { message: "Incorrect username" });
        }
        if (!userMatch.validatePassword(password)) {
            return done(null, false, {message: "Incorrect password" });
        }
        return done(null, userMatch);
    }
)

module.exports = localStrategy;