const { Schema, model } = require("mongoose");
const { Group6 } = require("./group6schema");
const { Stuff2 } = require("./stuff2schema");
const groupStuff7Schema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: Group6, required: true },
  stuff_id: { type: Schema.Types.ObjectId, ref: Stuff2, required: true },
});

const GroupStuff7 = model("group_stuff7", groupStuff7Schema);
module.exports = { GroupStuff7 };
