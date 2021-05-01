const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    /* id : {type : String, required : true}, */
    userId: {type : String, required : true},
    name: {type : String, required : true},
    manufacturer: {type : String, required : true},
    mainPepper: {type : String, required : true},
    imageUrl: {type : String},  
    heat: {type : Number, required : true},
    likes: {type : Number, default:0},
    dislikes: {type : Number, default:0},
    usersLiked: {type : [String] , default:[]},
    usersDisliked: {type : [String],default:[]},

})
sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);