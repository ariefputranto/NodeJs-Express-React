const express = require('express');
const router = express.Router();

// list controller
const FeatureController = require('../controllers/feature.controller');

/**
* @swagger
* tags:
*   - name: features
*     description: Features operations
*/

/**
* @swagger
* definitions:
*   Features:
*     type: object
*     properties:
*       id:
*         type: integer
*         description: Unique identifier representing a specific feature
*         example: 1
*       feature_name:
*         type: string
*         description: Name of the feature
*         required: true
*         example: General
*       created_at:
*         type: string
*         format: date-time
*         description: Feature creation datetime
*       updated_at:
*         type: string
*         format: date-time
*         description: Feature update datetime
*   ErrorResponse:
*     type: object
*     properties:
*       status:
*         type: string
*         default: failed
*       message:
*         type: string
*         default: server error
*       data:
*         type: array
*         default: []
*   SuccessResponse:
*     type: object
*     properties:
*       status:
*         type: string
*         default: success
*       message:
*         type: string
*         default: successfully save data
*       data:
*         type: array
*         default: []
*/

/**
* @swagger
* /feature:
*   get:
*     tags:
*       - features
*     summary: "List all features"
*     operationId: findAll
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters: []
*     responses:
*       200:
*         description: OK
*         schema:
*            $ref: "#/definitions/SuccessResponse"
*              
*/

router.route('/')
  .get((req, res) => {
    FeatureController.findAll(req, res);
  })

  /**
  * @swagger
  * /feature:
  *   post:
  *     tags:
  *       - features
  *     summary: "Create a new feature"
  *     security:
  *        - Bearer: []
  *     operationId: store
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         description: Created feature object
  *         required: true
  *         schema:
  *           $ref: "#/definitions/Features"
  *     responses:
  *       200:
  *         description: OK
  *         schema:
  *           $ref: "#/definitions/SuccessResponse"
  *       403:
  *          description: Feature not found
  *          schema:
  *             $ref: '#/definitions/ErrorResponse'
  */

  .post((req, res) => {
    FeatureController.store(req, res);
  });

router.route('/:id')

  /**
  * @swagger
  * /feature/{id}:
  *   get:
  *     tags:
  *       - features
  *     summary: Find the feature by ID
  *     operationId: findById
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: id of feature that needs to be fetched
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: OK
  *         schema:
  *           $ref: "#/definitions/SuccessResponse"
  *       404:
  *          description: Feature not found
  *          schema:
  *             $ref: '#/definitions/ErrorResponse'
  */

  .get((req, res) => {
    FeatureController.findById(req, res);
  })

  /**
  * @swagger
  * /feature/{id}:
  *   put:
  *     tags:
  *       - features
  *     summary: "Update an existing feature by ID"
  *     security:
  *       - Bearer: []
  *     operationId: update
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: id that need to be updated
  *         required: true
  *         type: integer
  *       - name: body
  *         in: body
  *         description: Updated feature object
  *         required: true
  *         schema:
  *           $ref: "#/definitions/Features"
  *     responses:
  *       200:
  *         description: OK
  *         schema:
  *           $ref: "#/definitions/SuccessResponse"
  *       400:
  *         description: Invalid feature
  *         schema:
  *           $ref: "#/definitions/ErrorResponse"
  */

  .put((req, res) => {
    FeatureController.update(req, res);
  })

  /**
  * @swagger
  * /feature/{id}:
  *   delete:
  *     tags:
  *       - features
  *     summary: Delete the feature by ID
  *     security:
  *       - Bearer: []
  *     operationId: destroy
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: id of feature that needs to be deleted
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: OK
  *         schema:
  *           $ref: "#/definitions/SuccessResponse"
  *       400:
  *         description: "Invalid ID"
  *         schema:
  *           $ref: "#/definitions/ErrorResponse"
  */

  .delete((req, res) => {
    FeatureController.destroy(req, res);
  });

module.exports = router;