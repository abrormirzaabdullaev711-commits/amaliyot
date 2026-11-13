const { Router } = require("express");
const student12 = Router();

const {
  addStudent12,
  getStudent12,
  getStudent12ById,
  deleteStudent12,
  updateStudent12,
  searchStudent12,
} = require("../controller/student12.controller");

const {
  createStudent12ValidationSchema,
  updateStudent12ValidationSchema,
} = require("../validation/student12Validation");

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
 *   name: Student
 *   description: Students12 ni boshqarish endpointlari
 */

/**
 * @swagger
 * /student12/addStudent12:
 *   post:
 *     summary: Yangi students12 yaratish
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lid_id
 *               - first_name
 *               - last_name
 *               - phone_number
 *               - bithday
 *             properties:
 *               lid_id:
 *                 type: string
 *                 description: Lid IDsi
 *               first_name:
 *                 type: string
 *                 description: Ismi
 *               last_name:
 *                 type: string
 *                 description: Familiyasi
 *               phone_number:
 *                 type: string
 *                 description: Telefon raqami
 *               bithday:
 *                 type: string
 *                 description: Tug'ilgan sanasi
 *               gender:
 *                 type: string
 *                 description: Jinsi
 *     responses:
 *       '201':
 *         description: Students12 yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
student12.post(
  "/addStudent12",
  validateSchema(createStudent12ValidationSchema),
  addStudent12,
);

/**
 * @swagger
 * /student12/getStudent12:
 *   get:
 *     summary: Barcha students12 larni olish
 *     tags: [Student]
 *     responses:
 *       '200':
 *         description: Students12 ro'yxati
 *       '500':
 *         description: Server xatosi
 */
student12.get("/getStudent12", getStudent12);

/**
 * @swagger
 * /student12/search:
 *   get:
 *     summary: Students12 qidirish
 *     tags: [Student]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: searhed students
 */
student12.get("/search", searchStudent12);

/**
 * @swagger
 * /student12/getStudent12ById/{id}:
 *   get:
 *     summary: ID orqali students12 olish
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Students12 topildi
 *       '404':
 *         description: Students12 topilmadi
 *       '500':
 *         description: Server xatosi
 */
student12.get("/getStudent12ById/:id", getStudent12ById);

/**
 * @swagger
 * /student12/deleteStudent12/{id}:
 *   delete:
 *     summary: Students12 o'chirish
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Students12 o'chirildi
 *       '404':
 *         description: Students12 topilmadi
 *       '500':
 *         description: Server xatosi
 */
student12.delete("/deleteStudent12/:id", deleteStudent12);

/**
 * @swagger
 * /student12/updateStudent12ById/{id}:
 *   put:
 *     summary: Students Update
 *     tags: [Student]
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
 *               lid_id:
 *                 type: string
 *                 description: Lid ID
 *               phone_number:
 *                 type: string
 *                 description: Telefon raqami
 *     responses:
 *       '200':
 *         description: Students12 yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Students12 topilmadi
 *       '500':
 *         description: Server xatosi
 */
student12.put(
  "/updateStudent12ById/:id",
  validateSchema(updateStudent12ValidationSchema),
  updateStudent12,
);

module.exports = { student12 };
