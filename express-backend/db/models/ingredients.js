const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientsDB = new Schema({
    name: String,
    protein: Number,
    fat: Number,
    carb: Number,
    calories: Number
});

module.exports = mongoose.model("Ingredients", ingredientsDB);