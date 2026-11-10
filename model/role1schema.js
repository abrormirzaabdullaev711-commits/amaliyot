const { Schema, model } = require("mongoose");

const role1Schema = new Schema({
  name: { type: String, required: true },
});
const Role = model("role", role1Schema);
module.exports = { Role };
