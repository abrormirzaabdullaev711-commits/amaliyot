const { Router } = require("express");
const lid = Router();

const {
  addLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
  searchLid,
} = require("../controller/lid11.controller");

const validateSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if(validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message)
  }
  next()
}

const {
  createLidValidationSchema,
  updateLidValidationSchema,
} = require("../validation/lid11Validation")

/**
 * @swagger
 * tags:
 *  name: Lids
 *  description: Lids boshqarish uchun endpointlar
 */

/**
 * @swagger
 * /lid/addLid:
 *  post:
 *    summary: Yangi lid qoshish
 *    tags:
 *      - Lids
 *    description: Yangi Lids yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - first_name
 *              - last_name
 *            properties:
 *               first_name:
 *                type: string
 *                descrpiton: Ali
 *               last_name:
 *                 type: string
 *                 descrpiton: Gani
 *               phone_number:
 *                 type: string
 *                 descrpiton: "676766767"
 *               lid_stage_id:
 *                 type: number
 *                 descrpiton: 67
 *               test_date:
 *                 type: string
 *                 descrpiton: "10 octomber"
 *               trial_lesson_date:
 *                 type: string
 *                 descrpiton: 11-10-26
 *               trial_lesson_time:
 *                 type: string
 *                 descrpiton: eleven pm
 *               trial_lesson_group_id:
 *                 type: number
 *                 descrpiton: 67
 *               lid_status_id:
 *                 type: number
 *                 descrpiton: 67
 *               cancel_reason_id:
 *                 type: number
 *                 descrpiton: 67 
 *    responses:
 *      '201':
 *        description: car muvaffaqiyatli yaratildi.
 *      '500':
 *        description: ichki server xatosi
 */

/**
 * @swagger
 * /lid/getLids:
 *   get:
 *     summary: Barcha lidlar o;osj
 *     tags: [Lids]
 *     description: Barcha lidlar ro'yxati olish
 *     responses:
 *       '200':
 *         description: lids ro'yxatio muvaffaqiyotli qaytarildi
 *       '500':
 *         description: Interval server error
 */

/**
 * @swagger
 * /lid/getLidById/{id}:
 *   get:
 *    summary: Lid id boyicha olish
 *    tags: [Lids]
 *    description: Id bilan Lid olish
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Lid olish uchun Id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: lid muvaffaqiyotli qaytarildi
 *      '404':
 *        description: lid topilmadi
 *      '500':
 *        description: Interval server error
 */

/**
 * @swagger
 * /lid/updateLid/{id}:
 *  put:
 *    summary: lid yangilash
 *    tags: [Lids]
 *    description: lid ma'lumotlarini yangilash
 *    parameters:
 *      - in: path
 *        name: id
 *        description: lid topish uchun id
 *    required: true
 *    schema: 
 *      type: string
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone_number:
 *                  type: string
 *                  description: No
 *                test_date:
 *                  type: string
 *                  description: "12" 
 *                trial_lesson_date:
 *                  type: string
 *                  description: dafa
 *                trial_lesson_time:
 *                  type: string
 *                  description: "12"
 *    responses:
 *      '200':
 *        description: lid muvaffaqiyotli yaratildi
 *      '400':
 *        description: Yomon so'rov validatsiya xatosi
 *      '404':
 *        description: lid not Found
 *      '500':
 *        description: Server Interval error
 */

/**
 * @swagger
 * /lid/deleteLid/{id}:
 *   delete:
 *     summary: Delete Lid with provided id
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of the Lid to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid delete succesfully
 *       '404':
 *         description: Lid not Found
 *       '500':
 *         descriptio: Interval server error
 */
 
/**
 * @swagger
 * /lid/searchLid:
 *   get: 
 *     summary: lid qidirish
 *     tags: [Lids]
 *     description: lid qiditish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qiduruv so'rovi orqaldi lid qidirish
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       '200':
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       '404':
 *         description: lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.post("/addLid",validateSchema(createLidValidationSchema), addLid);
lid.get("/getLids", getLids);
lid.get("/getLidById/:id", getLidById);
lid.put("/updateLid/:id",validateSchema(updateLidValidationSchema), updateLid);
lid.delete("/deleteLid/:id", deleteLid);
lid.get("/searchLid", searchLid)
module.exports = { lid };