const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
mongoose.set('useCreateIndex', true);


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        max: 50
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minlength : 5,
        maxlength : 255
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 1024
    },
    isAdmin : Boolean
});
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({email : this.email, isAdmin : this.isAdmin}, config.get('jwtPrivateKey'));
}
const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}
module.exports = {
    User : User,
    validate : validateUser
}