
exports.up = knex => knex.schema.createTable("products", (table) => {
      table.increments("id");
      table.text("name");
      table.text("description");
      table.text("image");
      table.text("category");
      table.float("price");
      table.integer("user_id").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("products");
