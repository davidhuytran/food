const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipesDB = new Schema({
    name: String,
    category: String,
    pic: String,
    ingredients: Array
});

module.exports = mongoose.model("Recipes", recipesDB);