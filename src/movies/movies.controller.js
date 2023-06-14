const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res){
    res.status(200).json({ data: await service.list() });
}

async function read(req, res){
    const movieId = req.params.movieId;
    res.status(200).json({ data: await service.read(movieId) });
}

async function listTheaters(req, res){
    const movieId = req.params.movieId;
    res.status(200).json({ data: await service.listTheaters(movieId) });
}

async function listReviews(req, res){
    const movieId = req.params.movieId;

}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)],
    listTheaters: [asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(listReviews)],
};