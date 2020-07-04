const router = require('express').Router();
const {Rental, validate} = require('../models/rental.model');
const {Movie} = require('../models/movies.model');
const {Customer} = require('../models/customers.model');


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('The rental with given id was not found');
    res.send(rental);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return ress.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer..');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie..');

    if(movie.numberInStock === 0) return res.status(400).send('Movie is not in stock');

    let rental = Rental({
        customer : {
            _id : customer._id,
            name : cusomer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            name : movie.name,
            dailyRentalRates : movie.dailyRentalRates
        }
    });
    rental = await rental.save();
    movie.numberInStock --;
    movie.save();
    res.send(rental);
});

module.exports = router;