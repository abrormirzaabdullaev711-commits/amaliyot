const { Group6 } = require("../model/group6schema");

//-------------------addGroup6----------------------//
const addGroup6 = async (req, res) => {
  try {
    const {
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_idint,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;

    const existingGroup = await Group6.findOne({ group_name });

    console.log(existingGroup);

    if (existingGroup) {
      return res.status(400).json({
        success: false,
        message: "bu nom bilan group mavjud",
      });
    } else {
      const newGroup = new Group6({
        group_name,
        lesson_start_time,
        lesson_continuous,
        lesson_week_day,
        group_stage_idint,
        room_number,
        room_floor,
        branch_id,
        lessons_quant,
        is_active,
      });
      await newGroup.save();
      return res.status(201).json({
        success: true,
        message: "group yaratildi",
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

//------------------------Get group6------------------------
const getGroup6 = async (req, res) => {
  try {
    const groups = await Group6.find({});
    res.json({
      success: true,
      message: "Group ro'yxati",
      innerData: groups,
    });
  } catch (error) {
    console.error("Error fetching Group6", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------getGroup6ById--------------------
const getGroup6ById = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group6.findById(groupId);

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "group topilmadi" });
    }
    res.json({ success: true, message: "group topildi", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//--------------------deleteGroup6------------------//
const deleteGroup6 = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group6.findByIdAndDelete(id);
    if (group) {
      res.status(200).json({
        success: true,
        message: "group o'chirildi",
        delete_group: group_name,
      });
    } else {
      res.status(404).json({ success: false, message: "group topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------------update Group6------------------------//
const updateGroup6 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateGroup = await Group6.findByIdAndUpdate(id, req.body,
       {new: true,});
    if (!updateGroup) {
      return res.status(404).json({
        success: false,
        message: "group topilmadi",
      });
    }
    res.json({
      success: true,
      message: "group yangilandi",
      group: updateGroup,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//----------------------search Group6-----------------//
const searchGroup6 = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res
        .status(400)
        .json({ success: false, message: "Noto'g'ri qidiruv so'rovi" });
    }

    const result = await Group6.find({
      $or: [{ group_name: { $regex: query, $options: "i" } }],
    }).populate("branch_id");

    if (result.length === 0) {
      return res.json({ success: false, message: "Bunday group topilmadi" });
    }
    res.json({ success: true, innerData: result });
  } catch (error) {
    console.error("Error fetching Group:", error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

module.exports = {
  addGroup6,
  getGroup6,
  getGroup6ById,
  searchGroup6,
  updateGroup6,
  deleteGroup6,
};
