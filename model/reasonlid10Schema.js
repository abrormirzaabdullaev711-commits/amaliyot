const { Schema, model } = require("mongoose");

const reasonlid10schema = new Schema({
  reasonlid: { type: String },
});

const Reasonlid10 = model("reasonlid10", reasonlid10schema);
module.exports = { Reasonlid10 };
