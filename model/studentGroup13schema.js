const { Schema, model } = require("mongoose");
const { Student12 } = require("./student12schema");
const { Group6 } = require("./group6schema");
const studentGroup13Schema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: Student12, required: true },
  group_id: { type: Schema.Types.ObjectId, ref: Group6, required: true },
});

const StudentGroup13 = model("student_group13", studentGroup13Schema);
module.exports = { StudentGroup13 };
