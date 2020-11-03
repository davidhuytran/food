const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesDB = new Schema({
    name: String,
    email: String,
    recipesID: Array
});

module.exports = mongoose.model("Categories", categoriesDB);