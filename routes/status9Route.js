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
 *     summary: Barcha Status larni olish
 *     tags: [Status]
 *     responses:
 *       '200':
 *         description: Status ro'yxati
 *       '500':
 *         description: Server xatosi
 */
status9.get("/getStatuss", getStatuss);

/**
 * @swagger
 * /status9/getstatusById/{id}:
 *   get:
 *     summary: ID orqali status9 olish
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Status topildi
 *       '404':
 *         description: Status topilmadi
 *       '500':
 *         description: Server xatosi
 */
status9.get("/getstatusById/:id", getStatusbyId);

/**
 * @swagger
 * /status9/deletestatus9/{id}:
 *   delete:
 *     summary: Status o'chirish
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Status o'chirildi
 *       '404':
 *         description: Status topilmadi
 *       '500':
 *         description: Server xatosi
 */
status9.delete("/deletestatus9/:id", deleteStatus);

/**
 * @swagger
 * /status9/updatestatus9ById/{id}:
 *   put:
 *     summary: Status ma'lumotlarini yangilash
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status :
 *                 type: string
 *                 description: Status
 *     responses:
 *       '200':
 *         description: Status yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Status topilmadi
 *       '500':
 *         description: Server xatosi
 */
status9.put(
  "/updatestatus9ById/:id",
  validateSchema(updateStatus9ValidationSchema),
  updateStatus,
);

module.exports = { status9 };
