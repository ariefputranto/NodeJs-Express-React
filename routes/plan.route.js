const express = require('express');
const router = express.Router();

// list controller
const PlanController = require('../controllers/plan.controller');

/**
* @swagger
* tags:
*   - name: plans
*     description: Plans operations
*/

/**
* @swagger
* definitions:
*   Plans:
*     type: object
*     properties:
*       id:
*         type: integer
*         description: Unique identifier representing a specific plan
*         example: 2
*       plan_name:
*         type: string
*         description: Name of the plan
*         required: true
*         example: Basic
*       plan_type:
*         type: string
*         description: Type of the plan (Montly or Yearly)
*         required: true
*         example: Montly
*       plan_price:
*         type: integer
*         description: Price of the plan
*         required: true
*         example: 100
*       features:
*         type: array
*         description: List feature id attached to plan
*         required: true
*         example: [1,2,3]
*       created_at:
*         type: string
*         format: date-time
*         description: Plans creation datetime
*       updated_at:
*         type: string
*         format: date-time
*         description: Plans update datetime
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
* /plan:
*   get:
*     tags:
*       - plans
*     summary: "List all plans"
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
		PlanController.findAll(req, res);
	})

	/**
	* @swagger
	* /plan:
	*   post:
	*     tags:
	*       - plans
	*     summary: "Create a new plan"
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
	*         description: Created plan object
	*         required: true
	*         schema:
	*           $ref: "#/definitions/Plans"
	*     responses:
	*       200:
	*         description: OK
	*         schema:
	*           $ref: "#/definitions/SuccessResponse"
	*       403:
	*          description: Plan not found
	*          schema:
	*             $ref: '#/definitions/ErrorResponse'
	*/

	.post((req, res) => {
		PlanController.store(req, res);
	});

router.route('/:id')

	/**
	* @swagger
	* /plan/{id}:
	*   get:
	*     tags:
	*       - plans
	*     summary: Find the plan by ID
	*     operationId: findById
	*     consumes:
	*       - application/json
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: id
	*         in: path
	*         description: id of plan that needs to be fetched
	*         required: true
	*         type: integer
	*     responses:
	*       200:
	*         description: OK
	*         schema:
	*           $ref: "#/definitions/SuccessResponse"
	*       404:
	*          description: Plan not found
	*          schema:
	*             $ref: '#/definitions/ErrorResponse'
	*/

	.get((req, res) => {
		PlanController.findById(req, res);
	})

	/**
	* @swagger
	* /plan/{id}:
	*   put:
	*     tags:
	*       - plans
	*     summary: "Update an existing plan by ID"
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
	*         description: Updated plan object
	*         required: true
	*         schema:
	*           $ref: "#/definitions/Plans"
	*     responses:
	*       200:
	*         description: OK
	*         schema:
	*           $ref: "#/definitions/SuccessResponse"
	*       400:
	*         description: Invalid plan
	*         schema:
	*           $ref: "#/definitions/ErrorResponse"
	*/

	.put((req, res) => {
		PlanController.update(req, res);
	})

	/**
	* @swagger
	* /plan/{id}:
	*   delete:
	*     tags:
	*       - plans
	*     summary: Delete the plan by ID
	*     security:
	*       - Bearer: []
	*     operationId: destroy
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: id
	*         in: path
	*         description: id of plan that needs to be deleted
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
		PlanController.destroy(req, res);
	});

module.exports = router;