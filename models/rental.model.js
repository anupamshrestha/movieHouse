const mongoose = require('mongoose');
const Joi= require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
            name : {
                type : String,
                required: true, 
                minlength : 3,
                maxlength : 50
            },
            isGold : {
                type : Boolean,
                default : false
            },
            phone : {
                type : String,
                required : true,
                minlength : 3,
                maxlength : 50
            }
        }),
        ref:'Customer',
        required : true
    }, 
    movie : {
        type : new mongoose.Schema({
                title : {
                    type : String,
                    required : true,
                    trim : true,
                    minlength : 1,
                    maxlength: 50
                },
                dailyRentalRate : {
                    type : Number,
                    required : true,
                    min : 0,
                    max : 20
                }
        }),
        ref: 'Movie',
        required: true    
    },
    datOut : {
        type : Date,
        required : true,
        default : Date.now
    },
    datereturned : {
        type : Date
    },
    rentalFee : {
        type : Number,
        min : 0
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId : Joi.objectId().required(),
        customerName: Joi.string(),
        movieTitle: Joi.string()
    };
    // console.log("schema>>", schema)
    return Joi.validate(rental, schema);
}



module.exports = {
    Rental : Rental,
    validate : validateRental
}