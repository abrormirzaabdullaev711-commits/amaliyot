const { GroupStuff7 } = require("../model/groupStuff7Schema");
const { searchGroup6 } = require("./group6.controller");

//-------------------addGroupStuff7----------------------//
const addGroupStuff7 = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const existingRelation = await GroupStuff7.findOne({ group_id, stuff_id });

    console.log(existingRelation);

    if (existingRelation) {
      return res.status(400).json({
        success: false,
        message: "bu group_stuff mavjud",
      });
    } else {
      const newGroupStuff = new GroupStuff7({
        group_id,
        stuff_id,
      });
      await newGroupStuff.save();
      return res.status(201).json({
        success: true,
        message: "group_stuff yaratildi",
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

//------------------------Get group_stuff7------------------------
const getGroupStuff7 = async (req, res) => {
  try {
    const groupStuffs = await GroupStuff7.find({});
    res.json({
      success: true,
      message: "GroupStuff ro'yxati",
      innerData: groupStuffs,
    });
  } catch (error) {
    console.error("Error fetching GroupStuff7", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------getGroupStuff7ById--------------------
const getGroupStuff7ById = async (req, res) => {
  try {
    const id = req.params.id;

    const groupStuff = await GroupStuff7.findById(id);

    if (!groupStuff) {
      return res.status(404).json({ success: false, message: "group_stuff topilmadi" });
    }
    res.json({ success: true, message: "group_stuff topildi", groupStuff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//--------------------deleteGroupStuff7------------------//
const deleteGroupStuff7 = async (req, res) => {
  try {
    const { id } = req.params;

    const groupStuff = await GroupStuff7.findByIdAndDelete(id);
    if (groupStuff) {
      res.status(200).json({
        success: true,
        message: "group_stuff o'chirildi",
        delete_group_stuff: groupStuff._id,
      });
    } else {
      res.status(404).json({ success: false, message: "group_stuff topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------------update GroupStuff7------------------------//
const updateGroupStuff7 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateGroupStuff = await GroupStuff7.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateGroupStuff) {
      return res.status(404).json({
        success: false,
        message: "group_stuff topilmadi",
      });
    }
    res.json({
      success: true,
      message: "group_stuff yangilandi",
      group_stuff: updateGroupStuff,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//----------------------search Groupstuff-----------------//
const searchGroupstuff = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await GroupStuff7.find({
      $or: [{ group_id: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Groupstuff:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Groupstuff" });
  }
};

module.exports = {
  addGroupStuff7,
  getGroupStuff7,
  getGroupStuff7ById,
  updateGroupStuff7,
  deleteGroupStuff7,
  searchGroup6,
};