
const Movie = require('../models/Movie');

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a movie
exports.createMovie = async (req, res) => {
    try {
        // Check if req.body is an array
        if (Array.isArray(req.body)) {
            const savedMovies = await Movie.insertMany(req.body);
            return res.status(201).json(savedMovies);
        } else {
            const movie = new Movie(req.body);
            const savedMovie = await movie.save();
            return res.status(201).json(savedMovie);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a movie
exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
