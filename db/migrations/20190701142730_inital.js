exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable("projects", function(table) {
        table.increments("id").primary();
        table.string("name");
        table.specificType('palettes', 'jsonb[]');
        table.timestamps(true, true);
      }),
  
      knex.schema.createTable("palettes", function(table) {
        table.increments("id").primary();
        table.string("name");
        table.string("color_1");
        table.string("color_2");
        table.string("color_3");
        table.string("color_4");
        table.string("color_5");
        table.string("color_6");
        table.integer("project_id");
        table.foreign("project_id").references("projects.id");
        table.timestamps(true, true);
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable("palettes"),
      knex.schema.dropTable("projects")
    ]);
  };
  