const { Schema, model } = require("mongoose");
const { Lesson8 } = require("./lesson8schema");
const { Student12 } = require("./student12schema");
const studentLesson14Schema = new Schema({
  lesson_id: { type: Schema.Types.ObjectId, ref: Lesson8, required: true },
  student_id: { type: Schema.Types.ObjectId, ref: Student12, required: true },
  is_there: { type: Boolean, default: false },
  reason: { type: String, trim: true },
  be_paid: { type: Boolean },
});

const StudentLesson14 = model("student_lesson14", studentLesson14Schema);
module.exports = { StudentLesson14 };
