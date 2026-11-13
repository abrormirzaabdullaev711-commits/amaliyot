const { Router } = require("express");
const studentGroup13 = Router();

const {
  addStudentGroup13,
  getStudentGroup13,
  getStudentGroup13ById,
  deleteStudentGroup13,
  updateStudentGroup13,
} = require("../controller/studentGroup13.controller");

const {
  createStudentGroup13ValidationSchema,
  updateStudentGroup13ValidationSchema,
} = require("../validation/studentGroup13Validation");

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
 *   name: StudentGroup
 *   description: StudentGroup13 ni boshqarish endpointlari
 */

/**
 * @swagger
 * /studentGroup13/addStudentGroup13:
 *   post:
 *     summary: Yangi studentGroup13 yaratish
 *     tags: [StudentGroup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - group_id
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: Student Id
 *               group_id:
 *                 type: string
 *                 description: Group Id
 *     responses:
 *       '201':
 *         description: studentGroup13 yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
studentGroup13.post(
  "/addStudentGroup13",
  validateSchema(createStudentGroup13ValidationSchema),
  addStudentGroup13,
);

/**
 * @swagger
 * /studentGroup13/getStudentGroup13:
 *   get:
 *     summary: Barcha studentGroup13 larni olish
 *     tags: [StudentGroup]
 *     responses:
 *       '200':
 *         description: studentGroup13 ro'yxati
 *       '500':
 *         description: Server xatosi
 */
studentGroup13.get("/getStudentGroup13", getStudentGroup13);


/**
 * @swagger
 * /studentGroup13/getStudentGroup13ById/{id}:
 *   get:
 *     summary: ID orqali studentGroup13 olish
 *     tags: [StudentGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: studentGroup13 topildi
 *       '404':
 *         description: studentGroup13 topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentGroup13.get("/getStudentGroup13ById/:id", getStudentGroup13ById);

/**
 * @swagger
 * /studentGroup13/deleteStudentGroup13/{id}:
 *   delete:
 *     summary: studentGroup13 o'chirish
 *     tags: [StudentGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: studentGroup13 o'chirildi
 *       '404':
 *         description: studentGroup13 topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentGroup13.delete("/deleteStudentGroup13/:id", deleteStudentGroup13);

/**
 * @swagger
 * /studentGroup13/updateStudentGroup13ById/{id}:
 *   put:
 *     summary: studentGroup13 ma'lumotlarini yangilash
 *     tags: [StudentGroup]
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
 *               group_id:
 *                 type: string
 *                 description: Group IDsi
 *     responses:
 *       '200':
 *         description: studentGroup13 yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: studentGroup13 topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentGroup13.put(
  "/updateStudentGroup13ById/:id",
  validateSchema(updateStudentGroup13ValidationSchema),
  updateStudentGroup13,
);

module.exports = { studentGroup13 };
