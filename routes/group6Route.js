const { Router } = require("express");
const group6 = Router();

const {
  addGroup6,
  getGroup6,
  getGroup6ById,
  deleteGroup6,
  updateGroup6,
} = require("../controller/group6.controller");

const {
  createGroup6ValidationSchema,
  updateGroup6ValidationSchema,
} = require("../validation/group6Validation");

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
 *   name: Group
 *   description: Group ni boshqarish endpointlari
 */

/**
 * @swagger
 * /group6/addGroup6:
 *   post:
 *     summary: Yangi group yaratish
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_name
 *               - lesson_start_time
 *               - lesson_continuous
 *               - lesson_week_day
 *               - group_stage_idint
 *               - room_number
 *               - room_floor
 *               - branch_id
 *               - lessons_quant
 *             properties:
 *               group_name:
 *                 type: string
 *                 description: Group nomi
 *               lesson_start_time:
 *                 type: string
 *                 description: Dars boshlanish vaqti
 *               lesson_continuous:
 *                 type: string
 *                 description: Dars davomiyligi
 *               lesson_week_day:
 *                 type: string
 *                 description: Dars haftasi kunlari
 *               group_stage_idint:
 *                 type: number
 *                 description: Group bosqich IDsi
 *               room_number:
 *                 type: string
 *                 description: Xona raqami
 *               room_floor:
 *                 type: number
 *                 description: Xona qavati
 *               branch_id:
 *                 type: string
 *                 description: Branch IDsi
 *               lessons_quant:
 *                 type: number
 *                 description: Darslar soni
 *               is_active:
 *                 type: boolean
 *                 description: Faollik holati
 *     responses:
 *       '201':
 *         description: Group yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
group6.post("/addGroup6", validateSchema(createGroup6ValidationSchema), addGroup6);

/**
 * @swagger
 * /group6/getGroup6:
 *   get:
 *     summary: Barcha group larni olish
 *     tags: [Group]
 *     responses:
 *       '200':
 *         description: Group ro'yxati
 *       '500':
 *         description: Server xatosi
 */
group6.get("/getGroup6", getGroup6);



/**
 * @swagger
 * /group6/getGroup6ById/{id}:
 *   get:
 *     summary: ID orqali group olish
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group topildi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Server xatosi
 */
group6.get("/getGroup6ById/:id", getGroup6ById);

/**
 * @swagger
 * /group6/deleteGroup6/{id}:
 *   delete:
 *     summary: Group o'chirish
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group o'chirildi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Server xatosi
 */
group6.delete("/deleteGroup6/:id", deleteGroup6);

/**
 * @swagger
 * /group6/updateGroup6ById/{id}:
 *   put:
 *     summary: Group ma'lumotlarini yangilash
 *     tags: [Group]
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
 *               group_name:
 *                 type: string
 *                 description: Group nomi
 *               lesson_start_time:
 *                 type: string
 *                 description: Dars boshlanish vaqti
 *               lesson_continuous:
 *                 type: string
 *                 description: Dars davomiyligi
 *               lesson_week_day:
 *                 type: string
 *                 description: Dars haftasi kunlari
 *               group_stage_idint:
 *                 type: number
 *                 description: Group bosqich IDsi
 *               room_number:
 *                 type: string
 *                 description: Xona raqami
 *               room_floor:
 *                 type: number
 *                 description: Xona qavati
 *               branch_id:
 *                 type: string
 *                 description: Branch IDsi
 *               lessons_quant:
 *                 type: number
 *                 description: Darslar soni
 *               is_active:
 *                 type: boolean
 *                 description: Faollik holati
 *     responses:
 *       '200':
 *         description: Group yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Server xatosi
 */
group6.put("/updateGroup6ById/:id", validateSchema(updateGroup6ValidationSchema), updateGroup6);

module.exports = { group6 };
