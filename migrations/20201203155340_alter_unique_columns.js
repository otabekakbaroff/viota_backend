exports.up = function(knex) {
    return knex.schema.alterTable('connection', table => {
        table.unique(['from', 'to'])
      })
};

exports.down = function(knex) {
    return knex.schema.table('connection', table => {
        table.dropUnique(['from', 'to'])
})};