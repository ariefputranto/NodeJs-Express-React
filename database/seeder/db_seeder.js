/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL plan feature
  await knex('plans_features').whereIn('plan_id', [1, 2]).del()

  // Deletes ALL plans
  await knex('plans').whereIn('id', [1, 2]).del()
  await knex('plans').insert([
    {id: 1, plan_name: 'Standard Plan', plan_type: 'Monthly', plan_price: 0},
    {id: 2, plan_name: 'Premium Plan', plan_type: 'Monthly', plan_price: 388},
  ]);

  // Deletes ALL feature
  await knex('features').whereIn('id', [1, 2, 3]).del()
  await knex('features').insert([
    {id: 1, feature_name: 'General'},
    {id: 2, feature_name: 'Specialist'},
    {id: 3, feature_name: 'Physiotherapy'},
  ]);

  // attach plans feature
  await knex('plans_features').insert([
    {id: 1, plan_id: 1, feature_id: 1},
    {id: 2, plan_id: 2, feature_id: 1},
    {id: 3, plan_id: 2, feature_id: 2},
    {id: 4, plan_id: 2, feature_id: 3},
  ]);
};
