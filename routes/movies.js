
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/getAllData', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/postData', movieController.createMovie);
router.put('/:id/updateData', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
