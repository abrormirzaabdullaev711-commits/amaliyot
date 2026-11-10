const { Schema, model } = require("mongoose");
const { stuff2 } = require("../routes/stuff2Route");
const { role1 } = require("../routes/role1Route");

const stuffRole3Schema = new Schema({
  stuff_id: { type: Schema.Types.ObjectId, ref: stuff2, required: true },
  role_id: { type: Schema.Types.ObjectId, ref: role1, required: true },
});

const StuffRole3 = model("stuff_role3", stuffRole3Schema);
module.exports = { StuffRole3 };