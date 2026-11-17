const { Student12 } = require("../model/student12schema");

//-------------------addStudent12----------------------//
const addStudent12 = async (req, res) => {
  try {
    const {
      lid_id,
      first_name,
      last_name,
      phone_number,
      bithday,
      gender,
    } = req.body;

    const existingStudent = await Student12.findOne({ phone_number });

    console.log(existingStudent);

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "bu telefon raqam bilan talaba mavjud",
      });
    } else {
      const newStudent = new Student12({
        lid_id,
        first_name,
        last_name,
        phone_number,
        bithday,
        gender,
      });
      await newStudent.save();
      return res.status(201).json({
        success: true,
        message: "student yaratildi",
      });
    }
  } catch (error) {
    console.error("Xato", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//------------------------Get student12------------------------
const getStudent12 = async (req, res) => {
  try {
    const students = await Student12.find({}).populate("lid_id");
    res.json({
      success: true,
      message: "Student ro'yxati",
      innerData: students,
    });
  } catch (error) {
    console.error("Error fetching Student12", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------getStudent12ById--------------------
const getStudent12ById = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student12.findById(id).populate("lid_id");

    if (!student) {
      return res.status(404).json({ success: false, message: "student topilmadi" });
    }
    res.json({ success: true, message: "student topildi", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//--------------------deleteStudent12------------------//
const deleteStudent12 = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student12.findByIdAndDelete(id);
    if (student) {
      res.status(200).json({
        success: true,
        message: "student o'chirildi",
        delete_student: student._id,
      });
    } else {
      res.status(404).json({ success: false, message: "student topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------------update Student12------------------------//
const updateStudent12 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStudent = await Student12.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateStudent) {
      return res.status(404).json({
        success: false,
        message: "student topilmadi",
      });
    }
    res.json({
      success: true,
      message: "student yangilandi",
      student: updateStudent,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//----------------------search Student-----------------//
const searchStudent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Student12.find({
      $or: [{ first_name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Student:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Student" });
  }
};

module.exports = {
  addStudent12,
  getStudent12,
  getStudent12ById,
  searchStudent,
  updateStudent12,
  deleteStudent12,
};