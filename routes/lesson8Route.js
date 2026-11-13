const { Router } = require("express");
const lesson8 = Router();

const {
  addLesson8,
  getLesson8,
  getLesson8ById,
  deleteLesson8,
  updateLesson8,
} = require("../controller/lesson8.controller");

const {
  createLesson8ValidationSchema,
  updateLesson8ValidationSchema,
} = require("../validation/lesson8Validation");

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
 *   name: Lesson
 *   description: Lesson8 ni boshqarish endpointlari
 */

/**
 * @swagger
 * /lesson8/addLesson8:
 *   post:
 *     summary: Yangi lesson8 yaratish
 *     tags: [Lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lesson_theme
 *               - lesson_number
 *               - lesson_id
 *               - lesson_date
 *             properties:
 *               lesson_theme:
 *                 type: string
 *                 description: Dars mavzusi
 *               lesson_number:
 *                 type: number
 *                 description: Dars raqami
 *               Lesson_id:
 *                 type: string
 *                 description: Lesson IDsi
 *               lesson_date:
 *                 type: string
 *                 description: Dars sanasi
 *     responses:
 *       '201':
 *         description: Lesson8 yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
lesson8.post("/addLesson8", validateSchema(createLesson8ValidationSchema), addLesson8);

/**
 * @swagger
 * /lesson8/getLesson8:
 *   get:
 *     summary: Barcha lesson8 larni olish
 *     tags: [Lesson]
 *     responses:
 *       '200':
 *         description: Lesson8 ro'yxati
 *       '500':
 *         description: Server xatosi
 */
lesson8.get("/getLesson8", getLesson8);

/**
 * @swagger
 * /lesson8/getLesson8ById/{id}:
 *   get:
 *     summary: ID orqali lesson8 olish
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lesson8 topildi
 *       '404':
 *         description: Lesson8 topilmadi
 *       '500':
 *         description: Server xatosi
 */
lesson8.get("/getLesson8ById/:id", getLesson8ById);

/**
 * @swagger
 * /lesson8/deleteLesson8/{id}:
 *   delete:
 *     summary: Lesson8 o'chirish
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lesson8 o'chirildi
 *       '404':
 *         description: Lesson8 topilmadi
 *       '500':
 *         description: Server xatosi
 */
lesson8.delete("/deleteLesson8/:id", deleteLesson8);

/**
 * @swagger
 * /lesson8/updateLesson8ById/{id}:
 *   put:
 *     summary: Lesson8 malumotlarini yangilash
 *     tags: [Lesson]
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
 *               lesson_theme:
 *                 type: string
 *                 description: Dars mavzusi
 *               lesson_number:
 *                 type: number
 *                 description: 67
 *               lesson_id: 
 *                 type: string
 *                 description: Lesson id
 *               lesson_date:
 *                 type: string
 *                 description: Dars date
 *     responses:
 *       '200':
 *         description: Lesson8 yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Lesson8 topilmadi
 *       '500':
 *         description: Server xatosi
 */
lesson8.put("/updateLesson8ById/:id", validateSchema(updateLesson8ValidationSchema), updateLesson8);

module.exports = { lesson8 };
