const router = require('express').Router();

const apiMoviesRouter = require('./router.api.genres');
const apiCustomerRouter = require('./router.api.customers');
const apiMovieRouter = require('./router.api.movies');
const apiRentalRouter = require('./router.api.rentals');

router.use('/api/genres', apiMoviesRouter);
router.use('/api/customers', apiCustomerRouter);
router.use('/api/movies', apiMovieRouter);
router.use('/api/rentals', apiRentalRouter);




module.exports = router;