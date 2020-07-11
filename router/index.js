const router = require('express').Router();

const apiMoviesRouter = require('./router.api.genres');
const apiCustomerRouter = require('./router.api.customers');
const apiMovieRouter = require('./router.api.movies');
const apiRentalRouter = require('./router.api.rentals');
const apiUserRouter = require('./router.api.users');
const apiAuthRouter = require('./router.api.auth');

router.use('/api/genres', apiMoviesRouter);
router.use('/api/customers', apiCustomerRouter);
router.use('/api/movies', apiMovieRouter);
router.use('/api/rentals', apiRentalRouter);
router.use('/api/users', apiUserRouter);
router.use('/api/auth', apiAuthRouter);



module.exports = router;