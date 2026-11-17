const { Schema, model } = require("mongoose");
const { Stuff2 } = require("../routes/stuff2Route");
const { Role1 } = require("../routes/role1Route");

const stuffRole3Schema = new Schema({
  stuff_id: { type: Schema.Types.ObjectId, ref: Stuff2, required: true },
  role_id: { type: Schema.Types.ObjectId, ref: Role1, required: true },
});

const StuffRole3 = model("stuff_role3", stuffRole3Schema);
module.exports = { StuffRole3 };