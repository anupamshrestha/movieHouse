const mongoose = require('mongoose');
const {ObjectId} = require('mongoose').Types;
const Joi= require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {genreSchema} = require('./genres.model');

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        maxlength: 50
    },
    genre : {
        type : ObjectId, ref: "Genre",
        required : true
    }, 

    numberInStock : {
        type : Number,
        required : true,
        min : 1,
        max : 20
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 20
    }
});
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title : Joi.string().min(1).required(),
        genre : Joi.objectId().required(),
        numberInStock : Joi.number().min(1).required(),
        dailyRentalRate : Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

module.exports = {
    Movie : Movie,
    validate : validateMovie
}