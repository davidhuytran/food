const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipesDB = new Schema({
    name: String,
    pic: String,
    ingredients: Array
});

module.exports = mongoose.model("Recipes", recipesDB);