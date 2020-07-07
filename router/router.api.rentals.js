const router = require('express').Router();
const {Rental, validate} = require('../models/rental.model');
const {Movie} = require('../models/movies.model');
const {Customer} = require('../models/customers.model');
// const Fawn = require('fawn');
// Fawn.init(require('mongoose'));
// console.log("asdas>>",Rental)

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.status(200).send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('The rental with given id was not found');
    res.status(200).send(rental);
});

router.post('/', async(req, res, next) => {
    try {
        const customer = await Customer.findOne( {name : req.body.customerName});
        if(!customer) return res.status(400).send('Invalid Customer..');
        req.body.customerId = String(customer._id);
        // console.log(customer)
        // console.log(customer.name);
        // console.log('CustomerID>>', req.body.customerId);
        
        const movie = await Movie.findOne({title : req.body.movieTitle});
        if(!movie) return res.status(400).send('Invalid movie..');
        req.body.movieId = String(movie._id);  

        // console.log(movie);
        // console.log(movie.title);
        // console.log("movieId>>", req.body.movieId);
    
        
        // console.log(req.body);
        
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        if(movie.numberInStock === 0) return res.status(400).send('Movie is not in stock');
        // console.log(req.body);
        // console.log(customer.name);
        // console.log(movie.title);
        

     
        let rental = Rental({
            customer :customer,
            movie : movie 
            
        }); 
        // console.log(customer.name);
        // console.log(rental);
        rental = await rental.save();
        movie.numberInStock--;
        movie.save();
        res.status(200).send('Rental created');
    } catch(ex) {
        res.status(500).send('Internal server failed.');
    }
    
});

module.exports = router;