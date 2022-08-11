const mongoose = require ("mongoose");

// person schema
const PersonModel = mongoose.Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
})

// exporting 
module.exports = mongoose.model('Person', PersonModel)