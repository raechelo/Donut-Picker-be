
exports.up = function(knex) {
    return Promise.all([
        knex.schema.table('projects', function(table){
            table.dropColumn('palettes')
        })
    ])
  
};

exports.down = function(knex) {
    return Promise.all([
       knex.schema.table('parks', function(table) {
         table.specificType('palettes', 'jsonb[]');
       })
     ]);
   };
