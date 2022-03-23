const HttpStatus = require('http-status-codes');
const Joi = require('joi');

const Feature = require('../models/feature.model');

/**
 * Find all the feature
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function findAll(req, res) {
    Feature.forge()
    .fetchAll()
    .then(feature => res.json({
        status: 'success',
        message: 'Successfully get feature data',
        data: feature.toJSON()
    }))
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }));
}

/**
 *  Find feature by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function findById(req, res) {
    Feature.forge({id: req.params.id})
    .fetch()
    .then(feature => {
        if (!feature) {
            res.status(HttpStatus.NOT_FOUND).json({
                status: 'failed',
                message: 'Feature is not exist!',
                data: err
            });
        }
        else {
            res.json({
                status: 'success',
                message: 'Successfully get feature data',
                data: feature.toJSON()
            });
        }
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }));
}

/**
 * Store new feature
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function store(req, res) {
    const schema = Joi.object({
        feature_name: Joi.string().min(1).required(),
    })

    const validate = schema.validate(req.body)
    if (Object.hasOwnProperty.call(validate, 'error')) {
        return res.json({
            status: 'failed',
            message: validate.error.details[0].message,
            data: validate
        })
    }

    const {feature_name} = req.body;

    Feature.forge({
        feature_name
    })
    .save()
    .then(feature => res.json({
        status: 'success',
        message: 'Successfully add new feature data',
        data: feature.toJSON()
    }))
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }));
}

/**
 * Update feature by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function update(req, res) {
    const schema = Joi.object({
        feature_name: Joi.string().min(1).required(),
    })

    const validate = schema.validate(req.body)
    if (Object.hasOwnProperty.call(validate, 'error')) {
        return res.json({
            status: 'failed',
            message: validate.error.details[0].message,
            data: validate
        })
    }

    Feature.forge({id: req.params.id})
    .fetch({require: true})
    .then(feature => {
        feature.save({
            feature_name: req.body.feature_name || feature.get('feature_name'),
        })
        .then(() => res.json({
            status: 'success',
            message: 'Successfully update feature data',
            data: feature.toJSON()
        }))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'failed',
            message: err.message,
            data: err
        }))
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }));
}

/**
 * Destroy feature by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function destroy(req, res) {
    Feature.forge({id: req.params.id})
    .fetch({require: true})
    .then(feature => {
        feature.destroy()
        .then(() => res.json({
            status: 'success',
            message: 'Successfully delete feature data',
            data: []
        }))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'failed',
            message: err.message,
            data: err
        }))
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }));
}

module.exports = {
  findAll: findAll,
  findById: findById,
  store: store,
  update: update,
  destroy: destroy,
}