const { Schema, model } = require("mongoose");

const stage4Schema = new Schema({
  name: { type: String, required: true, trim: true },
});

const Stage4 = model("stage4", stage4Schema);
module.exports = { Stage4 };