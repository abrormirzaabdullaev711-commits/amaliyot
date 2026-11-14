const { Lesson8 } = require("../model/lesson8Schema");

//-------------------addLesson8----------------------//
const addLesson8 = async (req, res) => {
  try {
    const {
      lesson_theme,
      lesson_number,
      group_id,
      lesson_date,
    } = req.body;

    const existingLesson = await Lesson8.findOne({ lesson_number, group_id });

    console.log(existingLesson);

    if (existingLesson) {
      return res.status(400).json({
        success: false,
        message: "bu guruhda bunday raqamli dars mavjud",
      });
    } else {
      const newLesson = new Lesson8({
        lesson_theme,
        lesson_number,
        group_id,
        lesson_date,
      });
      await newLesson.save();
      return res.status(201).json({
        success: true,
        message: "lesson yaratildi",
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

//------------------------Get lesson8------------------------
const getLesson8 = async (req, res) => {
  try {
    const lessons = await Lesson8.find({}).populate("group_id");
    res.json({
      success: true,
      message: "Lesson ro'yxati",
      innerData: lessons,
    });
  } catch (error) {
    console.error("Error fetching Lesson8", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------getLesson8ById--------------------
const getLesson8ById = async (req, res) => {
  try {
    const id = req.params.id;

    const lesson = await Lesson8.findById(id).populate("group_id");

    if (!lesson) {
      return res.status(404).json({ success: false, message: "lesson topilmadi" });
    }
    res.json({ success: true, message: "lesson topildi", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//--------------------deleteLesson8------------------//
const deleteLesson8 = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson8.findByIdAndDelete(id);
    if (lesson) {
      res.status(200).json({
        success: true,
        message: "lesson o'chirildi",
        delete_lesson: lesson,
      });
    } else {
      res.status(404).json({ success: false, message: "lesson topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------------update Lesson8------------------------//
const updateLesson8 = async (req, res) => {
  try {
    const { lesson_theme,
      lesson_number,
      lesson_id,
      lesson_date,
     } = req.params;
    const updateLesson = await Lesson8.findByIdAndUpdate(
      lesson_theme,
      lesson_number,
      lesson_id,
      lesson_date,
      req.body,
      { new: true }
    );
    if (!updateLesson) {
      return res.status(404).json({
        success: false,
        message: "lesson topilmadi",
      });
    }
    res.json({
      success: true,
      message: "lesson yangialandi",
      lesson: updateLesson,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//----------------------search Lesson8-----------------//
const searchLesson8 = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ success: false, message: "Notori qidiruv sorovi" });
    }

    const result = await Lesson8.find({
      $or: [{ lesson_theme: { $regex: query,$options: "i" } }],
    }).populate("group_id");

    if (result.length === 0) {
      return res.json({ success: false, message: "Bunday lesson topilmadi" });
    }
    res.json({ success: true, innerData: result });
  } catch (error) {
    console.error("Error fetching Lesson:", error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

module.exports = {
  addLesson8,
  getLesson8,
  getLesson8ById,
  searchLesson8,
  updateLesson8,
  deleteLesson8,
};
