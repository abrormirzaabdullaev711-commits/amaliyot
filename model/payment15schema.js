const { Schema, model } = require("mongoose");
const { student12 } = require("./student12schema");
const payment15Schema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: student12, required: true },
  payment_last_date: { type: Date, required: true },
  payment_date: { type: Date, required: true },
  price: { type: Number, required: true },
  is_paid: { type: Boolean, default: false },
  total_attent: { type: Number, required: true },
});

const Payment15 = model("payment15", payment15Schema);
module.exports = { Payment15 };
