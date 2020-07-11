const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user.model');
const Joi = require('joi');



router.post('/', async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('Invalid User or password..');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid User or password');

    const token = user.generateAuthToken();

    res.status(200).send(token);
    
});
function validate(req) {
    const schema = {
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
        
    }
    return Joi.validate(req, schema);
}

module.exports = router;