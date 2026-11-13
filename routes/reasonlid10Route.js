const { Router } = require("express");
const ReasonLid10 = Router();

const {
  addReasonlid,
  getReasonlids,
  getReasonlidById,
  deleteReasonlid,
  updateReasonlid,
} = require("../controller/reasonlid10.controller");

const {
  createReasonlid10Validation,
  updateReasonlid10Validation,
} = require("../validation/reasonlid10Validation");

const validateSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.details[0].xmessage,
    });
  }

  next();
};

/**
 * @swagger
 * tags:
 *  name: Reasonlid
 *  description: Reasonlid boshqarish endpointlari
 */

/**
 * @swagger
 * /ReasonLid10/addReasonlid:
 *  post:
 *    summary: Yangi Reasonlid yaratish
 *    tags: [Reasonlid]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - Reasonlid
 *            properties:
 *              reasonlid:
 *                type: string
 *                description: Reasonlid
 *    responses:
 *     '201':
 *        description: Reasonlid yaratildi
 *     '400':
 *        description: Validation xatosi
 *     '500':
 *        description: Server xatosi
 *
 */
ReasonLid10.post(
  "/addReasonlid",
  validateSchema(createReasonlid10Validation),
  addReasonlid,
);

/**
 * @swagger
 * /ReasonLid10/getReasonlids:
 *   get:
 *     summary: Barcha Reasonlid larni olish
 *     tags: [Reasonlid]
 *     responses:
 *       '200':
 *         description: Reasonlid ro'yxati
 *       '500':
 *         description: Server xatosi
 */
ReasonLid10.get("/getReasonlids", getReasonlids);

/**
 * @swagger
 * /ReasonLid10/getReasonlidById/{id}:
 *   get:
 *     summary: ID orqali ReasonLid10 olish
 *     tags: [Reasonlid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reasonlid topildi
 *       '404':
 *         description: Reasonlid topilmadi
 *       '500':
 *         description: Server xatosi
 */
ReasonLid10.get("/getReasonlidById/:id", getReasonlidById);

/**
 * @swagger
 * /ReasonLid10/deleteReasonLid10/{id}:
 *   delete:
 *     summary: Reasonlid o'chirish
 *     tags: [Reasonlid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reasonlid o'chirildi
 *       '404':
 *         description: Reasonlid topilmadi
 *       '500':
 *         description: Server xatosi
 */
ReasonLid10.delete("/deleteReasonLid10/:id", deleteReasonlid);

/**
 * @swagger
 * /ReasonLid10/updateReasonLid10ById/{id}:
 *   put:
 *     summary: Reasonlid ma'lumotlarini yangilash
 *     tags: [Reasonlid]
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
 *               reasonlid:
 *                 type: string
 *                 description: Reasonlid
 *     responses:
 *       '200':
 *         description: Reasonlid yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Reasonlid topilmadi
 *       '500':
 *         description: Server xatosi
 */
ReasonLid10.put(
  "/updateReasonLid10ById/:id",
  validateSchema(updateReasonlid10Validation),
  updateReasonlid,
);

module.exports = { ReasonLid10 };
