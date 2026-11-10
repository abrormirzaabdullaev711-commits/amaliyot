const { Router } = require("express");
const stuff2 = Router();

const {
  addStuff2,
  getStuff2,
  getStuff2ById,
  deleteStuff2,
  updateStuff2,
} = require("../controller/stuff2.controller");

const {
  createStuff2ValidationSchema,
  updateStuff2ValidationSchema,
} = require("../validation/stuff2Validation");

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
 *   name: Stuff
 *   description: Stuff ni boshqarish endpointlari
 */

/**
 * @swagger
 * /stuff2/addStuff2:
 *   post:
 *     summary: Yangi stuff yaratish
 *     tags: [Stuff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - phone_number
 *               - login
 *               - parol
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Ismi
 *               last_name:
 *                 type: string
 *                 description: Familiyasi
 *               phone_number:
 *                 type: string
 *                 description: Telefon raqami
 *               login:
 *                 type: string
 *                 description: Logini
 *               parol:
 *                 type: string
 *                 description: Paroli
 *               is_active:
 *                 type: boolean
 *                 description: Faollik holati
 *     responses:
 *       '201':
 *         description: Stuff yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
stuff2.post("/addStuff2", validateSchema(createStuff2ValidationSchema), addStuff2);

/**
 * @swagger
 * /stuff2/getStuff2:
 *   get:
 *     summary: Barcha stuff larni olish
 *     tags: [Stuff]
 *     responses:
 *       '200':
 *         description: Stuff ro'yxati
 *       '500':
 *         description: Server xatosi
 */
stuff2.get("/getStuff2", getStuff2);


/**
 * @swagger
 * /stuff2/getStuff2ById/{id}:
 *   get:
 *     summary: ID orqali stuff olish
 *     tags: [Stuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff topildi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Server xatosi
 */
stuff2.get("/getStuff2ById/:id", getStuff2ById);

/**
 * @swagger
 * /stuff2/deleteStuff2/{id}:
 *   delete:
 *     summary: Stuff o'chirish
 *     tags: [Stuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff o'chirildi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Server xatosi
 */
stuff2.delete("/deleteStuff2/:id", deleteStuff2);

/**
 * @swagger
 * /stuff2/updateStuff2ById/{id}:
 *   put:
 *     summary: Stuff ma'lumotlarini yangilash
 *     tags: [Stuff]
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
 *               phone_number:
 *                 type: string
 *                 description: Telefon raqami
 *               login:
 *                 type: string
 *                 description: Logini
 *               parol:
 *                 type: string
 *                 description: Paroli
 *               is_active:
 *                 type: boolean
 *                 description: Faollik holati
 *     responses:
 *       '200':
 *         description: Stuff yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Server xatosi
 */
stuff2.put("/updateStuff2ById/:id", validateSchema(updateStuff2ValidationSchema), updateStuff2);

module.exports = { stuff2 };