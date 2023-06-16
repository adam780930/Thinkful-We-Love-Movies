const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware
const movieIdExist = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie.length === 0 || !movieId)
    return next({
      status: 404,
      message: `Movie not found`,
    });
  res.locals.movie = movie[0];
  next();
};

//functions
async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    res.status(200).json({ data: (await service.listShowing()).splice(0, 15) });
  } else {
    res.status(200).json({ data: await service.list() });
  }
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.movie });
}

async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  res.status(200).json({ data: await service.listTheaters(movieId) });
}

async function listReviews(req, res) {
  const { movieId } = req.params;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieIdExist), asyncErrorBoundary(read)],
  listReviews: [
    asyncErrorBoundary(movieIdExist),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(movieIdExist),
    asyncErrorBoundary(listTheaters),
  ],
};
