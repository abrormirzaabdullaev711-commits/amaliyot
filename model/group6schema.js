const { Schema, model } = require("mongoose");
const { branch5 } = require("./branch5schema");
const group6Schema = new Schema({
  group_name: { type: String, required: true, trim: true },
  lesson_start_time: { type: String, required: true, trim: true },
  lesson_continuous: { type: String, required: true, trim: true },
  lesson_week_day: { type: String, required: true, trim: true },
  group_stage_idint: { type: Number, required: true },
  room_number: { type: String, required: true, trim: true },
  room_floor: { type: Number, required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: branch5, required: true },
  lessons_quant: { type: Number, required: true },
  is_active: { type: Boolean },
});

const Group6 = model("group6", group6Schema);
module.exports = { Group6 };
