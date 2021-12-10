exports.up = function(knex) {
    return knex.schema.createTable('messages', table =>{

        table.increments();

        table.string('message').notNullable()

        table
        .string("from") 
        .notNullable()
        .references("username")
        .inTable("users")
        .onUpdate("CASCADE") 
        .onDelete("CASCADE");
        table
        .string("to") 
        .notNullable()
        .references("username")
        .inTable("users")
        .onUpdate("CASCADE") 
        .onDelete("CASCADE");
        table
        .integer('date')
        .notNullable()
    })
  };
  
exports.down = function(knex) {
     return knex.schema.dropTableIfExists('messages');
};
  

