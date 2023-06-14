const knex = require("../db/connection");

function list() {
    return knex("theaters");
}


module.exports={
    list,
}