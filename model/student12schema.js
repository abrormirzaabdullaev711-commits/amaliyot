const { Schema, model } = require("mongoose");
const { lid } = require("./lid11schema");
const student12Schema = new Schema({
  lid_id: { type: Schema.Types.ObjectId, ref: lid, required: true },
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  phone_number: { type: String, required: true, trim: true },
  bithday: { type: Date, required: true },
  gender: { type: String, required: true, trim: true },
});

const Student12 = model("student12", student12Schema);
module.exports = { Student12 };
