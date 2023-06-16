const knex = require("../db/connection");

function list() {
  return knex("reviews");
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId });
}

function update(updatedReview, reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update({ ...updatedReview })
    .then((data) => data[0]);
}

function getCritic(criticId) {
  return knex("critics").select().where({ critic_id: criticId });
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  getCritic,
  destroy,
};
