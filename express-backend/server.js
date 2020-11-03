const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-Parser');
const logger = require("morgan");
const passport = require("passport");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./db/gql");
const cookieSession = require('cookie-session');
const keys = require('./configs/keys');

require('./db');
require("./services/passport");

const port = process.env.PORT || 4000;

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Cookie session
app.use(cookieSession({
    keys: [keys.cookieKey],
    maxAge: 180 * 24 * 60 * 60 * 1000,
}))

app.use(passport.initialize());
app.use(passport.session());




//  Routes
app.use("/auth",  require("./routes/auth"));

app.listen(port, function() {
    console.log("Running on " + port);
});

module.exports = app;