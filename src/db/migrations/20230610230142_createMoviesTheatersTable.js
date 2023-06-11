
exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        
        table.boolean("is_showing");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters");
};
