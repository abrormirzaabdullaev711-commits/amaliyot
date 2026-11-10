const { Schema, model } = require("mongoose");

const status9schema = new Schema({
  status: { type: String },
});

const Status9 = model("status9", status9schema);
module.exports = { Status9 };
