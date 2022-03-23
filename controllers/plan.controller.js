const HttpStatus = require('http-status-codes');
const Joi = require('joi');

const Bookshelf = require('../config/bookshelf');
const Plan = require('../models/plan.model');
const Feature = require('../models/feature.model');
const PlanFeature = require('../models/plan_feature.model');

/**
 * Find all the plan
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function findAll(req, res) {
    Plan.forge()
    .fetchAll({withRelated: ['features']})
    .then(plan => res.json({
        status: 'success',
        message: 'Successfully get plan data',
        data: plan.toJSON()
    }))
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }));
}

/**
 *  Find plan by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function findById(req, res) {
    Plan.forge({id: req.params.id})
    .fetch({withRelated: ['features']})
    .then(plan => {
        if (!plan) {
            res.status(HttpStatus.NOT_FOUND).json({
                status: 'failed',
                message: 'Plan is not exist!',
                data: err
            });
        }
        else {
            res.json({
                status: 'success',
                message: 'Successfully get plan data',
                data: plan.toJSON()
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
 * Store new plan
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 async function store(req, res) {
    const schema = Joi.object({
        plan_name: Joi.string().min(1).required(),
        plan_type: Joi.string().valid(...Plan.typeList()).required(),
        plan_price: Joi.number().integer().min(1),
        features: Joi.array().unique().items(Joi.number().required())
    })

    const validate = schema.validate(req.body)
    if (Object.hasOwnProperty.call(validate, 'error')) {
        return res.json({
            status: 'failed',
            message: validate.error.details[0].message,
            data: validate
        })
    }

    const {plan_name, plan_type, plan_price, features} = req.body;
        
    // validate features
    const listExistFeature = await Feature.where('id', 'in', features).fetchAll({require: false})
    if (listExistFeature.length === 0) {
        return res.json({
            status: 'failed',
            message: 'Features is not exist',
            data: []
        })
    }

    try {
        // list of existing feature id
        const listExistFeatureId = listExistFeature.map(item => (item.get('id')))

        // add new plan
        const plan = await Plan.forge({
            plan_name, plan_type, plan_price
        })
        .save()

        // map with plan feature
        for (const index in listExistFeatureId) {
            const featureId = listExistFeatureId[index]

            await PlanFeature.forge({
                plan_id: plan.get('id'),
                feature_id: featureId
            })
            .save()
        }

        res.json({
            status: 'success',
            message: 'Successfully add new plan data',
            data: plan.toJSON()
        })

    } catch(err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'failed',
            message: err.message,
            data: err
        })
    }
}

/**
 * Update plan by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 async function update(req, res) {
    const schema = Joi.object({
        plan_name: Joi.string().min(1).required(),
        plan_type: Joi.string().valid(...Plan.typeList()).required(),
        plan_price: Joi.number().integer().min(1),
        features: Joi.array().unique().items(Joi.number().required())
    })

    const validate = schema.validate(req.body)
    if (Object.hasOwnProperty.call(validate, 'error')) {
        return res.json({
            status: 'failed',
            message: validate.error.details[0].message,
            data: validate
        })
    }

    const {plan_name, plan_type, plan_price, features} = req.body;

    // validate features
    const listExistFeature = await Feature.where('id', 'in', features).fetchAll({require: false})
    if (listExistFeature.length === 0) {
        return res.json({
            status: 'failed',
            message: 'Features is not exist',
            data: []
        })
    }

    Bookshelf.transaction(async (transaction) => {
        // list of existing feature id
        const listExistFeatureId = listExistFeature.map(item => (item.get('id')))

        // check plan
        const plan = await Plan.forge({id: req.params.id}).fetch()

        // update plan
        await plan.save({
            plan_name: req.body.plan_name || plan.get('plan_name'),
            plan_type: req.body.plan_type || plan.get('plan_type'),
            plan_price: req.body.plan_price || plan.get('plan_price')
        }, { transacting: transaction })

        // map with plan feature
        PlanFeature.where('plan_id', plan.get('id')).destroy({ transacting: transaction })
        for (const index in listExistFeatureId) {
            const featureId = listExistFeatureId[index]

            await PlanFeature.forge({
                plan_id: plan.get('id'),
                feature_id: featureId
            })
            .save(null, { transacting: transaction })
        }

        return plan
    }).then(plan => res.json({
        status: 'success',
        message: 'Successfully update plan data',
        data: plan.toJSON()
    })).catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: err.message,
        data: err
    }))
}

/**
 * Destroy plan by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 function destroy(req, res) {
    Plan.forge({id: req.params.id})
    .fetch({require: true})
    .then(plan => {
        plan.destroy()
        .then(() => res.json({
            status: 'success',
            message: 'Successfully delete plan data',
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