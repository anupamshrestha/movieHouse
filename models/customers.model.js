const mongoose = require('mongoose');
const { string } = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
 }));
 function validateCustomer (customer) {
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        isGold : Joi.boolean().required(),
        phone : Joi.string().min(3).max(50).required()
    }
    return Joi.validate(customer, schema);
}
module.exports = {
    Customer : Customer,
    validate : validateCustomer
}
   