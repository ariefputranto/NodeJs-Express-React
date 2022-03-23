const bookshelf = require('../config/bookshelf');

const TABLE_NAME = 'plans_features';

/**
 * PlanFeatures model.
 */
const PlanFeatures = bookshelf.Model.extend({
    tableName: TABLE_NAME,
    hasTimestamps: true,
})

module.exports = PlanFeatures;