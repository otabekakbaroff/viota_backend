exports.up = function(knex) {
    return knex.schema.createTable('messages', table =>{

        table.increments();

        table.string('message').notNullable()

        table
        .string("from") 
        .unsigned() 
        .notNullable()
        .references("username")
        .inTable("users")
        .onUpdate("CASCADE") 
        .onDelete("CASCADE");

        table
        .string("to") 
        .unsigned() 
        .notNullable()
        .references("username")
        .inTable("users")
        .onUpdate("CASCADE") 
        .onDelete("CASCADE");

        table
        .integer('date')
        .notNullable()
        .unique()

    })
  };
  
exports.down = function(knex) {
     return knex.schema.dropTableIfExists('messages');
};
  

