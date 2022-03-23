const bookshelf = require('../config/bookshelf');

const PlanFeature = require('./plan_feature.model');
const Feature = require('./feature.model');

const TABLE_NAME = 'plans';

/**
 * Plan model.
 */
const Plan = bookshelf.Model.extend({
    tableName: TABLE_NAME,
    hasTimestamps: true,
    features: function() {
        return this.belongsToMany(Feature).through(PlanFeature)
    }
}, {
    typeList: function() {
        return ['Monthly', 'Yearly']
    }
})

module.exports = Plan;