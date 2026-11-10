const { Schema, model } = require("mongoose");

const branch5Schema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  call_number: { type: String, required: true, trim: true },
});

const Branch5 = model("branch5", branch5Schema);
module.exports = { Branch5 };