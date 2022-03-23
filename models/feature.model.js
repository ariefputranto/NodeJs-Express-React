const bookshelf = require('../config/bookshelf');

const TABLE_NAME = 'features';

/**
 * Features model.
 */
const Features = bookshelf.Model.extend({
    tableName: TABLE_NAME,
    hasTimestamps: true,
})

module.exports = Features;