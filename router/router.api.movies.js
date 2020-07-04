const router = require('express').Router();
const Joi = require('joi');
const { Movie, validate } = require('../models/movies.model');
const mongoose = require('mongoose');
const { Genre } = require('../models/genres.model');

router.get('/', async(req, res) => {
    const movies = await Movie
        .find()
        .sort('title')
    res.send(movies);
});

router.post('/', async (req, res, next) => {
    try{
    const genre = await Genre.findOne({name: req.body.genre});
    if (!genre) return res.status(400).send('Invalid genre.');
    req.body.genre = String(genre._id);
    //TODO
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let movie = new Movie({ 
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.status(200).send({data: "Movie created!!"});
}catch(e){
    next(e);
}
  });

router.get('/:id', async(req, res) => {
    const movie = await Movie
    .findById(req.params.id)
    .sort('name');
    if (!movie) return res.status(404).send('The movie with the given id was not found');
    res.send(movie);
});


router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        { 
        title: req.params.title,
        genre : {
            _id: genre._id,
            name : genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
        },{ new  : true});

        if (!movie) return res.status(404).send('The movie with given id is not found');
        res.send(movie);
    

});
router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given id is not found');
    res.send(movie);
});

module.exports = router;
