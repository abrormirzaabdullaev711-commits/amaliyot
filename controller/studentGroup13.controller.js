const { StudentGroup13 } = require("../model/studentGroup13schema");

//----------------------addStudentGroup13----------------------//
const addStudentGroup13 = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;
    const existingStudentGroup = await StudentGroup13.findOne({ student_id });

    console.log(existingStudentGroup);

    if (existingStudentGroup) {
      return res.status(400).json({
        success: false,
        message: "bu student_group mavjud",
      });
    } else {
      const newStudentGroup = new StudentGroup13({
        student_id,
        group_id,
      });
      await newStudentGroup.save();
      return res.status(201).json({
        success: true,
        message: "student_group yaratildi",
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

//----------------------------Get student_group13------------------------
const getStudentGroup13 = async (req, res) => {
  try {
    const studentGroups = await StudentGroup13.find({})
      .populate("student_id")
      .populate("group_id");
    res.json({
      success: true,
      message: "StudentGroup ro'yxati",
      innerData: studentGroups,
    });
  } catch (error) {
    console.error("Error fetching StudentGroup13", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//---------------------------getStudentGroup13ById--------------------------//
const getStudentGroup13ById = async (req, res) => {
  try {
    const id = req.params.id;

    const studentGroup = await StudentGroup13.findById(id)
      .populate("student_id")
      .populate("group_id");

    if (!studentGroup) {
      return res
        .status(404)
        .json({ success: false, message: "student_group topilmadi" });
    }
    res.json({ success: true, message: "student_group topildi", studentGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//---------------------------deleteStudentGroup13----------------------//
const deleteStudentGroup13 = async (req, res) => {
  try {
    const { id } = req.params;

    const studentGroup = await StudentGroup13.findByIdAndDelete(id);
    if (studentGroup) {
      res.status(200).json({
        success: true,
        message: "student_group o'chirildi",
        delete_student_group: studentGroup._id,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "student_group topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//-------------------------------update StudentGroup13------------------------//
const updateStudentGroup13 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStudentGroup = await StudentGroup13.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!updateStudentGroup) {
      return res.status(404).json({
        success: false,
        message: "student_group topilmadi",
      });
    }
    res.json({
      success: true,
      message: "student_group yangilandi",
      student_group: updateStudentGroup,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};
//----------------------search Studentgroup-----------------//
const searchStudentgroup = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Studentgroup12.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Studentgroup:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Studentgroup" });
  }
};
module.exports = {
  addStudentGroup13,
  getStudentGroup13,
  getStudentGroup13ById,
  updateStudentGroup13,
  deleteStudentGroup13,
  searchStudentgroup
};
