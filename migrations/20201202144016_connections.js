exports.up = function(knex) {
    return knex.schema.createTable('connection', table =>{

        table.increments();

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
        .integer('status')
        .defaultTo(0)

        table
        .string('date')
        
    })
  };
  
exports.down = function(knex) {
     return knex.schema.dropTableIfExists('connection');
};
  