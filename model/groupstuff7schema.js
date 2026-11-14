const { Schema, model } = require("mongoose");
const { group6 } = require("../routes/group6Route");
const { stuff2 } = require("../routes/stuff2Route");
const groupStuff7Schema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: group6, required: true },
  stuff_id: { type: Schema.Types.ObjectId, ref: stuff2, required: true },
});

const GroupStuff7 = model("group_stuff7", groupStuff7Schema);
module.exports = { GroupStuff7 };
