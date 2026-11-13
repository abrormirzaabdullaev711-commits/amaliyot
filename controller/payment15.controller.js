const { Payment15 } = require("../model/payment15schema");

//-------------------addPayment15----------------------//
const addPayment15 = async (req, res) => {
  try {
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    } = req.body;

    const newPayment = new Payment15({
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    });
    
    await newPayment.save();
    return res.status(201).json({
      success: true,
      message: "payment yaratildi",
    });
  } catch (error) {
    console.error("Xato", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//------------------------Get payment15------------------------
const getPayment15 = async (req, res) => {
  try {
    const payments = await Payment15.find({}).populate("student_id");
    res.json({
      success: true,
      message: "Payment ro'yxati",
      innerData: payments,
    });
  } catch (error) {
    console.error("Error fetching Payment15", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------getPayment15ById--------------------
const getPayment15ById = async (req, res) => {
  try {
    const id = req.params.id;

    const payment = await Payment15.findById(id).populate("student_id");

    if (!payment) {
      return res.status(404).json({ success: false, message: "payment topilmadi" });
    }
    res.json({ success: true, message: "payment topildi", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//--------------------deletePayment15------------------//
const deletePayment15 = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment15.findByIdAndDelete(id);
    if (payment) {
      res.status(200).json({
        success: true,
        message: "payment o'chirildi",
        delete_payment: payment._id,
      });
    } else {
      res.status(404).json({ success: false, message: "payment topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------------update Payment15------------------------//
const updatePayment15 = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayment = await Payment15.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatePayment) {
      return res.status(404).json({
        success: false,
        message: "payment topilmadi",
      });
    }
    res.json({
      success: true,
      message: "payment yangilandi",
      payment: updatePayment,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//----------------------search Payment15-----------------//
const searchPayment15 = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ success: false, message: "Noto'g'ri qidiruv so'rovi" });
    }

    const result = await Payment15.find({}).populate("student_id");

    if (result.length === 0) {
      return res.json({ success: false, message: "Bunday payment topilmadi" });
    }
    res.json({ success: true, innerData: result });
  } catch (error) {
    console.error("Error fetching Payment:", error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

module.exports = {
  addPayment15,
  getPayment15,
  getPayment15ById,
  searchPayment15,
  updatePayment15,
  deletePayment15,
};