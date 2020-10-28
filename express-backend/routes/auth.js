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
        req.logIn(newUser, (err) => {
            if (err) {
                return next(err);
            }
            if (newUser) {
                return res.status(200).send({msg: "Account created "});
            }
        });
    }
    return res.status(400).send("Account already exists");
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log("ERROR");
        return res.json({
          
          status: info.status,
          msg: info.msg
        })
      }
      
      // LogIn User
      // req / res held in closure
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        if (user) {
          console.log("HEY WE MDE IT");
          return res.json({
            status: 200,
            msg: info.msg
          })
        }
      });
    })(req, res, next);
  });

router.get("/users", async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

module.exports = router;
