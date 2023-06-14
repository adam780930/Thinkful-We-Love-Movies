const knex = require("../db/connection");

function list() {
    return knex("reviews");
}


module.exports={
    list,
}