const { Router } = require("express");
const role1 = Router();

const {
  addRole1,
  getRoles,
  getRolebyId,
  deleteRole,
  updateRole,
} = require("../controller/role1.controller");

const {
  createRoleValidationSchema,
  updateRoleValidationSchema,
} = require("../validation/role1Validation");

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
 *   name: Roles
 *   description: Rollarni boshqarish endpointlari
 */

/**
 * @swagger
 * /role1/addRole1:
 *   post:
 *     summary: Yangi role yaratish
 *     tags: [Roles]
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
 *                 description: Admin
 *     responses:
 *       201:
 *         description: Role yaratildi
 *       400:
 *         description: Validation xatosi
 *       500:
 *         description: Server xatosi
 */
role1.post("/addRole1", validateSchema(createRoleValidationSchema), addRole1);

/**
 * @swagger
 * /role1/getRoles:
 *   get:
 *     summary: Barcha rollarni olish
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Rollar ro'yxati
 *       500:
 *         description: Server xatosi
 */
role1.get("/getRoles", getRoles);

/**
 * @swagger
 * /role1/getRoleById/{id}:
 *   get:
 *     summary: ID orqali role olish
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role topildi
 *       404:
 *         description: Role topilmadi
 *       500:
 *         description: Server xatosi
 */
role1.get("/getRoleById/:id", getRolebyId);

/**
 * @swagger
 * /role1/deleteRole/{id}:
 *   delete:
 *     summary: Role o'chirish
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role o'chirildi
 *       404:
 *         description: Role topilmadi
 *       500:
 *         description: Server xatosi
 */
role1.delete("/deleteRole/:id", deleteRole);

/**
 * @swagger
 * /role1/updateRoleById/{id}:
 *   put:
 *     summary: Role ma'lumotlarini yangilash
 *     tags: [Roles]
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
 *                 description: Admin
 *     responses:
 *       200:
 *         description: Role yangilandi
 *       400:
 *         description: Validation xatosi
 *       404:
 *         description: Role topilmadi
 *       500:
 *         description: Server xatosi
 */
role1.put("/updateRoleById/:id",validateSchema(updateRoleValidationSchema),updateRole,);

module.exports = { role1 };
