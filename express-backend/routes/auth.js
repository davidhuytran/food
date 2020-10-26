const express = require("express");
const passport = require("passport");
const router = express.Router();
const { User } = require("../db/models");

router.post("/signup", async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        const newUser = new User({
            email: email,
        });
        newUser.password = newUser.hashPassword(password);
        newUser.save();
        return res.send("Account created");
    }
    return res.send("Account already exists");
})

router.post("/login", async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if (user) {
                return res.json({
                    status: 100,
                    success: true,
                });
            }
        });
    })(req, res, next);
});

router.get("/users", async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

module.exports = router;
