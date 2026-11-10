const { Router } = require("express");
const status9 = Router();

const {
  addStatus,
  getStatuss,
  getStatusbyId,
  deleteStatus,
  updateStatus,
} = require("../controller/status9.controller");

const {
  createStatus9ValidationSchema,
  updateStatus9ValidationSchema,
} = require("../validation/status9Validation");

const validateSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.details[0].message,
    });
  }

  next();
};

module.exports = validateSchema;
/**
 * @swagger
 * tags:
 *  name: Status
 *  description: Status boshqarish endpointlari
 */

/**
 * @swagger
 * /status9/addStatus:
 *  post:
 *    summary: Yangi status yaratish
 *    tags: [Status]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *                description: Status
 *    responses:
 *     '201':
 *        description: Status yaratildi
 *     '400':
 *        description: Validation xatosi
 *     '500':
 *        description: Server xatosi
 *
 */
status9.post(
  "/addStatus",
  validateSchema(createStatus9ValidationSchema),
  addStatus,
);

/**
 * @swagger
 * /status9/getStatuss:
 *   get:
 *     summary: Barcha branch larni olish
 *     tags: [Status]
 *     responses:
 *       '200':
 *         description: Branch ro'yxati
 *       '500':
 *         description: Server xatosi
 */
status9.get("/getStatuss", getStatuss);

module.exports = { status9 };
