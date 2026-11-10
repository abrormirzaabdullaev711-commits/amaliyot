const { Router } = require("express");
const stage4 = Router();

const {
  addStage4,
  getStage4,
  getStage4ById,
  deleteStage4,
  updateStage4,
} = require("../controller/stage4.controller");

const {
  createStage4ValidationSchema,
  updateStage4ValidationSchema,
} = require("../validation/stage4Validation");

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
 *   name: Stage
 *   description: Stage4 ni boshqarish endpointlari
 */

/**
 * @swagger
 * /stage4/addStage4:
 *   post:
 *     summary: Yangi stage yaratish
 *     tags: [Stage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Stage 
 *     responses:
 *       '201':
 *         description: Stage yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
stage4.post("/addStage4", validateSchema(createStage4ValidationSchema), addStage4);

/**
 * @swagger
 * /stage4/getStage4:
 *   get:
 *     summary: Barcha stage larni olish
 *     tags: [Stage]
 *     responses:
 *       '200':
 *         description: Stage ro'yxati
 *       '500':
 *         description: Server xatosi
 */
stage4.get("/getStage4", getStage4);



/**
 * @swagger
 * /stage4/getStage4ById/{id}:
 *   get:
 *     summary: ID orqali stage olish
 *     tags: [Stage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage4 topildi
 *       '404':
 *         description: Stage4 topilmadi
 *       '500':
 *         description: Server xatosi
 */
stage4.get("/getStage4ById/:id", getStage4ById);

/**
 * @swagger
 * /stage4/deleteStage4/{id}:
 *   delete:
 *     summary: Stage o'chirish
 *     tags: [Stage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage o'chirildi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Server xatosi
 */
stage4.delete("/deleteStage4/:id", deleteStage4);

/**
 * @swagger
 * /stage4/updateStage4ById/{id}:
 *   put:
 *     summary: Stage ma'lumotlarini yangilash
 *     tags: [Stage]
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
 *                 description: Stage 
 *     responses:
 *       '200':
 *         description: Stage yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Server xatosi
 */
stage4.put("/updateStage4ById/:id", validateSchema(updateStage4ValidationSchema), updateStage4);

module.exports = { stage4 };
