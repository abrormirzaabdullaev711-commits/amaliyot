const { Router } = require("express");
const branch5 = Router();

const {
  addBranch5,
  getBranch5,
  getBranch5ById,
  deleteBranch5,
  updateBranch5,
} = require("../controller/branch5.controller");

const {
  createBranch5ValidationSchema,
  updateBranch5ValidationSchema,
} = require("../validation/branch5Validation");

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
 *   name: Branch
 *   description: Branch ni boshqarish endpointlari
 */

/**
 * @swagger
 * /branch5/addBranch5:
 *   post:
 *     summary: Yangi branch yaratish
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - call_number
 *             properties:
 *               name:
 *                 type: string
 *                 description: name
 *               address:
 *                 type: string
 *                 description: address
 *               call_number:
 *                 type: string
 *                 description: phone number
 *     responses:
 *       '201':
 *         description: Branch yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
branch5.post("/addBranch5", validateSchema(createBranch5ValidationSchema), addBranch5);

/**
 * @swagger
 * /branch5/getBranch5:
 *   get:
 *     summary: Barcha branch larni olish
 *     tags: [Branch]
 *     responses:
 *       '':
 *         description: Branch ro'yxati
 *       '500':
 *         description: Server xatosi
 */
branch5.get("/getBranch5", getBranch5);



/**
 * @swagger
 * /branch5/getBranch5ById/{id}:
 *   get:
 *     summary: ID orqali branch5 olish
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '':
 *         description: Branch topildi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Server xatosi
 */
branch5.get("/getBranch5ById/:id", getBranch5ById);

/**
 * @swagger
 * /branch5/deleteBranch5/{id}:
 *   delete:
 *     summary: Branch o'chirish
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '':
 *         description: Branch o'chirildi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Server xatosi
 */
branch5.delete("/deleteBranch5/:id", deleteBranch5);

/**
 * @swagger
 * /branch5/updateBranch5ById/{id}:
 *   put:
 *     summary: Branch ma'lumotlarini yangilash
 *     tags: [Branch]
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
 *               name:
 *                 type: string
 *                 description: Branch nomi
 *               address:
 *                 type: string
 *                 description: Manzili
 *               call_number:
 *                 type: string
 *                 description: Telefon raqami
 *     responses:
 *       '':
 *         description: Branch yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Server xatosi
 */
branch5.put("/updateBranch5ById/:id", validateSchema(updateBranch5ValidationSchema), updateBranch5);

module.exports = { branch5 };
