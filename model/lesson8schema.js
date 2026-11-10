const { Schema, model } = require("mongoose");

const lesson8Schema = new Schema({
  lesson_theme: { type: String, required: true, trim: true },
  lesson_number: { type: Number, required: true },
  group_id: { type: Schema.Types.ObjectId, ref: "group6", required: true },
  lesson_date: { type: Date, required: true },
});

const Lesson8 = model("lesson8", lesson8Schema);
module.exports = { Lesson8 };