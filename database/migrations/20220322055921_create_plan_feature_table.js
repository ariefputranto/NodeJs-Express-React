/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('plans_features', table => {
    table.bigIncrements('id').primary().unsigned();
    table.bigInteger('plan_id').unsigned().index().references('id').inTable('plans').notNullable();
    table.bigInteger('feature_id').unsigned().index().references('id').inTable('features').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('plans_features');
};
