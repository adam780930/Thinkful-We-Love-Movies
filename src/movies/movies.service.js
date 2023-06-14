const knex = require("../db/connection");

function list() {
    return knex("movies");
}

function listShowing() {

}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

function listTheater(){
    return knex("movies as m")
    
}

function listReviews(){

}


module.exports={
    list,
}