const { Router } = require("express");
const payment15 = Router();

const {
  addPayment15,
  getPayment15,
  getPayment15ById,
  deletePayment15,
  updatePayment15,
  searchPayment15,
} = require("../controller/payment15.controller");

const {
  createPayment15ValidationSchema,
  updatePayment15ValidationSchema,
} = require("../validation/payment15Validation");

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
 *   name: Payment
 *   description: Payment15 ni boshqarish endpointlari
 */

/**
 * @swagger
 * /payment15/addPayment15:
 *   post:
 *     summary: Yangi payment15 yaratish
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - price
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: Student IDsi
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 description: Oxirgi to'lov sanasi
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 description: To'lov qilingan sana
 *               price:
 *                 type: number
 *                 description: Narxi
 *               is_paid:
 *                 type: boolean
 *                 description: To'langanligi
 *               total_attent:
 *                 type: number
 *                 description: Umumiy davomat
 *     responses:
 *       '201':
 *         description: Payment15 yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
payment15.post("/addPayment15", validateSchema(createPayment15ValidationSchema), addPayment15);

/**
 * @swagger
 * /payment15/getPayment15:
 *   get:
 *     summary: Barcha payment15 larni olish
 *     tags: [Payment]
 *     responses:
 *       '200':
 *         description: Payment15 ro'yxati
 *       '500':
 *         description: Server xatosi
 */
payment15.get("/getPayment15", getPayment15);

/**
 * @swagger
 * /payment15/search:
 *   get:
 *     summary: Payment15 qidirish
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Topilgan payment15 lar
 */
payment15.get("/search", searchPayment15);

/**
 * @swagger
 * /payment15/getPayment15ById/{id}:
 *   get:
 *     summary: ID orqali payment15 olish
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment15 topildi
 *       '404':
 *         description: Payment15 topilmadi
 *       '500':
 *         description: Server xatosi
 */
payment15.get("/getPayment15ById/:id", getPayment15ById);

/**
 * @swagger
 * /payment15/deletePayment15/{id}:
 *   delete:
 *     summary: Payment15 o'chirish
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment15 o'chirildi
 *       '404':
 *         description: Payment15 topilmadi
 *       '500':
 *         description: Server xatosi
 */
payment15.delete("/deletePayment15/:id", deletePayment15);

/**
 * @swagger
 * /payment15/updatePayment15ById/{id}:
 *   put:
 *     summary: Payment15 ma'lumotlarini yangilash
 *     tags: [Payment]
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
 *               student_id:
 *                 type: string
 *                 description: Student IDsi
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 description: Oxirgi to'lov sanasi
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 description: To'lov qilingan sana
 *               price:
 *                 type: number
 *                 description: Narxi
 *               is_paid:
 *                 type: boolean
 *                 description: To'langanligi
 *               total_attent:
 *                 type: number
 *                 description: Umumiy davomat
 *     responses:
 *       '200':
 *         description: Payment15 yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Payment15 topilmadi
 *       '500':
 *         description: Server xatosi
 */
payment15.put("/updatePayment15ById/:id", validateSchema(updatePayment15ValidationSchema), updatePayment15);

module.exports = { payment15 };