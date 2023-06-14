const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res){
    

    res.json({ data: await service.list() });
}

async function read(req, res){
    const movieId = req.params.movieId;
    res.json({ data: await service.read(movieId) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
};