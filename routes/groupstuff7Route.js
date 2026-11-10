const { Router } = require("express");
const groupstuff7 = Router();

const {
  addGroupStuff7,
  getGroupStuff7,
  getGroupStuff7ById,
  deleteGroupStuff7,
  updateGroupStuff7,
} = require("../controller/groupstuff7.controller");

const {
  createGroupStuff7ValidationSchema,
  updateGroupStuff7ValidationSchema,
} = require("../validation/groupStuff7Validation");

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
 *   name: Groupstuff
 *   description: GroupStuff7 ni boshqarish endpointlari
 */

/**
 * @swagger
 * /groupstuff7/addGroupStuff7:
 *   post:
 *     summary: Yangi groupstuff7 yaratish
 *     tags: [Groupstuff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_id
 *               - stuff_id
 *             properties:
 *               group_id:
 *                 type: string
 *                 description: Group IDsi
 *               stuff_id:
 *                 type: string
 *                 description: Stuff IDsi
 *     responses:
 *       '201':
 *         description: groupstuff7 yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
groupstuff7.post("/addGroupStuff7", validateSchema(createGroupStuff7ValidationSchema), addGroupStuff7);

/**
 * @swagger
 * /groupstuff7/getGroupStuff7:
 *   get:
 *     summary: Barcha groupstuff7 larni olish
 *     tags: [Groupstuff]
 *     responses:
 *       '200':
 *         description: groupstuff7 ro'yxati
 *       '500':
 *         description: Server xatosi
 */
groupstuff7.get("/getGroupStuff7", getGroupStuff7);

/**
 * @swagger
 * /groupstuff7/getGroupStuff7ById/{id}:
 *   get:
 *     summary: ID orqali groupstuff7 olish
 *     tags: [Groupstuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: groupstuff7 topildi
 *       '404':
 *         description: groupstuff7 topilmadi
 *       '500':
 *         description: Server xatosi
 */
groupstuff7.get("/getGroupStuff7ById/:id", getGroupStuff7ById);

/**
 * @swagger
 * /groupstuff7/deleteGroupStuff7/{id}:
 *   delete:
 *     summary: groupstuff7 o'chirish
 *     tags: [Groupstuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: groupstuff7 o'chirildi
 *       '404':
 *         description: groupstuff7 topilmadi
 *       '500':
 *         description: Server xatosi
 */
groupstuff7.delete("/deleteGroupStuff7/:id", deleteGroupStuff7);

/**
 * @swagger
 * /groupstuff7/updateGroupStuff7ById/{id}:
 *   put:
 *     summary: groupstuff7 ma'lumotlarini yangilash
 *     tags: [Groupstuff]
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
 *               group_id:
 *                 type: string
 *                 description: Group IDsi
 *               stuff_id:
 *                 type: string
 *                 description: Stuff IDsi
 *     responses:
 *       '200':
 *         description: groupstuff7 yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: groupstuff7 topilmadi
 *       '500':
 *         description: Server xatosi
 */
groupstuff7.put("/updateGroupStuff7ById/:id", validateSchema(updateGroupStuff7ValidationSchema), updateGroupStuff7);

module.exports = { groupstuff7 };