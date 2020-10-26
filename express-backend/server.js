const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-Parser');
const logger = require("morgan");
const passport = require("passport");

require('./db');
require("./services/passport");

const port = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

//  Routes
app.use("/auth",  require("./routes/auth"));

app.listen(port, function() {
    console.log("Running on " + port);
});

module.exports = app;