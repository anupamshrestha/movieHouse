const router = require('express').Router();
const {Genre, validate }= require('../models/genres.model');
const token = require('../Middleware/auth');
const admin = require('../Middleware/admin')




router.get('/', async (req, res) => {
    const genres = await Genre
        .find()
        .sort('name');
    res.send(genres);
});

router.post('/',token, async (req, res, next) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let genre = new Genre({
            name : req.body.name
        });
        genre = await genre.save();
        res.status(200).send('Genre Created.'); 
    } catch(e){
        next(e);
    }
     
});

router.put('/:id', async (req, res, next) => {
    try {
        const { error } = validate(req.body);
        if (error) res.status(400).send(error.details[0].message);

        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{new : true} );
        if(!genre) return res.status(404).send('The movie with given id is not found');

        res.status(200).send('Genre Updated.');  
    } catch (e) {
        next(e);
    }
    
});

router.delete('/:id',[token, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id); 
    if(!genre) return res.status(404).send('The movie with given id is not found');
    res.status(200).send('Genre Deleted');  
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("The movie with given id was not found");
    res.send(genre);
    
});

module.exports = router;