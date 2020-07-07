const router = require('express').Router();
const Joi = require('joi');
const { Movie, validate } = require('../models/movies.model');
const mongoose = require('mongoose');
const { Genre } = require('../models/genres.model');
const Fawn = require('fawn');

router.get('/', async(req, res) => {
    const movies = await Movie
        .find()
        .sort('title')
        res.status(200).send(movies);  
});

router.post('/', async (req, res, next) => {

    try{
    const genre = await Genre.findOne({name : req.body.genre });
    // console.log("genre>>", genre);
    if (!genre) return res.status(400).send('Invalid genre.');
    req.body.genre = String(genre._id);
   
    //TODO
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let movie = new Movie({ 
      title: req.body.title,
      genre: genre.name,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.status(200).send({data: "Movie created!!"});
    } catch(e) {
    next(e);
    }
});

router.put('/:id', async(req, res, next) => {
    try {
        const genre = await Genre.findOne({name : req.body.genre });
        if (!genre) return res.status(400).send('Invalid genre.');
        req.body.genre = String(genre._id);
    
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const movie = await Movie.findByIdAndUpdate(req.params.id,
            { 
            title: req.body.title,
            genre : genre.name,
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
            },{ new  : true});
    
            if (!movie) return res.status(404).send('The movie with given id is not found');
            res.status(200).send('Movie Updated');   
    } catch (e){
        next(() => new Error('Failed to update the movie'));
    }
}); 
    

router.get('/:id', async(req, res) => {
    const movie = await Movie
    .findById(req.params.id)
    .sort('name');
    if (!movie) return res.status(404).send('The movie with the given id was not found');
    res.status(200).send(movie);  
});



router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given id is not found');
    res.status(200).send('The movie with given id is deleted');  
});

module.exports = router;
