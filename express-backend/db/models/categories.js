const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesDB = new Schema({
    name: String,
});

module.exports = mongoose.model("Categories", categoriesDB);