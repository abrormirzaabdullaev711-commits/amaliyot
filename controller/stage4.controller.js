const { Stage4 } = require("../model/stage4schema");

//-------------------------addStage4---------------------------//
const addStage4 = async (req, res) => {
  try {
    const { name } = req.body;
    const existingStage = await Stage4.findOne({ name });

    console.log(existingStage);

    if (existingStage) {
      return res.status(400).json({
        success: false,
        message: "bu nom bilan stage mavjud",
      });
    } else {
      const newStage = new Stage4({
        name,
      });
      await newStage.save();
      return res.status(201).json({
        success: true,
        message: "royxatdan o'tish muvaffaqiyatli yakunlandi",
      });
    }
  } catch (error) {
    console.error("Xato", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

//------------------------Get stage4---------------------------//
const getStage4 = async (req, res) => {
  try {
    const stages = await Stage4.find({});
    res.json({
      success: true,
      message: "Barcha Stage4 lar royxati muvaffaqiyatli olindi",
      innerData: stages,
    });
  } catch (error) {
    console.error("Error fetching Stage4", error);
    res.status(500).json({
      success: false,
      message: "Server hatosi: Stage4 olishda xato yuz berdi",
    });
  }
};

//--------------------getStage4ById-------------------------//
const getStage4ById = async (req, res) => {
  try {
    const stageId = req.params.id;

    const stage = await Stage4.findById(stageId);

    if (!stage) {
      return res.status(404).json({ message: "stage not found" });
    }
    res.json({ message: "stage found", stage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

//---------------------------deleteStage4--------------------//
const deleteStage4 = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await Stage4.findByIdAndDelete(id);
    if (stage) {
      res.status(200).json({
        success: true,
        message: "Stage muvaffaqqiyatli o'chirildi",
        delete_stage: stage.name,
      });
    } else {
      res.status(404).json({ success: false, message: "stage not found" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------------update Stage4------------------------//
const updateStage4 = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateStage = await Stage4.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updateStage) {
      return res.status(404).json({
        success: false,
        message: "stage not found",
      });
    }
    res.json({
      success: true,
      message: "stage updated sucessfully",
      stage: updateStage,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------search Stage-----------------//
const searchStage = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Stage4.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Stage:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Stage" });
  }
};


module.exports = {
  addStage4,
  getStage4,
  getStage4ById,
  updateStage4,
  deleteStage4,
};