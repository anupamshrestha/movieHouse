const token = require('../Middleware/auth')
const _ = require('lodash');
const router = require('express').Router();
const {User, validate} = require('../models/user.model')
const bcrypt = require('bcrypt');

router.get('/me', token, async(req, res, next) => {
    const user = await User.findOne({email : req.user.email});
    res.status(200).send(_.pick(user, ['name', 'email']));
});

router.post('/', async (req, res, next) => {
    try {
        const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //testing for unique email id
    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send('User already registered..');

    user = new User(_.pick(req.body,['name', 'email', 'password']));

    //Hashing the passaword
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    //generating Auth Token

    const token = user.generateAuthToken();
    res.status(200).header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
    } catch (e) {
        next(e);
    }
    
});

module.exports = router;