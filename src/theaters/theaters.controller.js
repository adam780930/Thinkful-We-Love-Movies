const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const theaters = await service.list();
  const nowPlaying = [];
  for (let i = 0; i < theaters.length; i++) {
    const theater = theaters[i];
    const { theater_id } = theater;
    const theaterAndMovies = {
      ...theater,
      movies: await service.listMovies(theater_id),
    };
    nowPlaying.push(theaterAndMovies);
  }
  res.status(200).json({ data: nowPlaying });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
