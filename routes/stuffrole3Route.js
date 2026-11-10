const { Router } = require("express");
const stuffrole3 = Router();

const {
  addStuffRole3,
  getStuffRole3,
  getStuffRole3ById,
  deleteStuffRole3,
  updateStuffRole3,
} = require("../controller/stuffrole3.controller");

const {
  createStuffRole3ValidationSchema,
  updateStuffRole3ValidationSchema,
} = require("../validation/stuffrole3Validation");

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
 *   name: StuffRole
 *   description: StuffRole ni boshqarish endpointlari
 */

/**
 * @swagger
 * /stuffrole3/addStuffRole3:
 *   post:
 *     summary: Yangi stuffrole yaratish
 *     tags: [StuffRole]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stuff_id
 *               - role_id
 *             properties:
 *               stuff_id:
 *                 type: string
 *                 description: Stuff 
 *               role_id:
 *                 type: string
 *                 description: Role 
 *     responses:
 *       201:
 *         description: Stuffrole yaratildi
 *       400:
 *         description: Validation xatosi
 *       500:
 *         description: Server xatosi
 */
stuffrole3.post("/addStuffRole3", validateSchema(createStuffRole3ValidationSchema), addStuffRole3);

/**
 * @swagger
 * /stuffrole3/getStuffRole3:
 *   get:
 *     summary: Barcha stuffrole larni olish
 *     tags: [StuffRole]
 *     responses:
 *       200:
 *         description: Stuffrole ro'yxati
 *       500:
 *         description: Server xatosi
 */
stuffrole3.get("/getStuffRole3", getStuffRole3);


/**
 * @swagger
 * /stuffrole3/getStuffRole3ById/{id}:
 *   get:
 *     summary: ID orqali stuffrole olish
 *     tags: [StuffRole]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stuffrole topildi
 *       404:
 *         description: Stuffrole topilmadi
 *       500:
 *         description: Server xatosi
 */
stuffrole3.get("/getStuffRole3ById/:id", getStuffRole3ById);

/**
 * @swagger
 * /stuffrole3/deleteStuffRole3/{id}:
 *   delete:
 *     summary: Stuffrole o'chirish
 *     tags: [StuffRole]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stuffrole o'chirildi
 *       404:
 *         description: Stuffrole topilmadi
 *       500:
 *         description: Server xatosi
 */
stuffrole3.delete("/deleteStuffRole3/:id", deleteStuffRole3);

/**
 * @swagger
 * /stuffrole3/updateStuffRole3ById/{id}:
 *   put:
 *     summary: Stuffrole malumotlarini yangilash
 *     tags: [StuffRole]
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
 *               stuff_id:
 *                 type: string
 *                 description: Stuff IDsi
 *               role_id:
 *                 type: string
 *                 description: Role IDsi
 *     responses:
 *       200:
 *         description: Stuffrole yangilandi
 *       400:
 *         description: Validation xatosi
 *       404:
 *         description: Stuffrole topilmadi
 *       500:
 *         description: Server xatosi
 */
stuffrole3.put("/updateStuffRole3ById/:id", validateSchema(updateStuffRole3ValidationSchema), updateStuffRole3);

module.exports = { stuffrole3 };