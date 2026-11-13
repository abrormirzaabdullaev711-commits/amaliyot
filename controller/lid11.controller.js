const { Lid } = require("../model/lid11schema");

//---------------------Add lid-----------------
const addLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;

    const existingLid = await Lid.findOne({ lid_stage_id });
    console.log(existingLid);

    if (existingLid) {
      return res.status(400).json({
        success: false,
        message: "bu lid_stage_id bilan royxatdan otgan lid mavjud",
      });
    } else {
      const newLid = new Lid({
        first_name,
        last_name,
        phone_number,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        lid_status_id,
        cancel_reason_id,
      });

      await newLid.save();

      res.status(201).json({
        success: true,
        message: "Lid successfully added",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//---------------------Get all lids-----------------
const getLids = async (req, res) => {
  try {
    const lids = await Lid.find();

    res.status(200).json({
      success: true,
      message: "All lids fetched",
      innerData: lids,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//---------------------Get lid by ID-----------------
const getLidById = async (req, res) => {
  try {
    const { id } = req.params;

    const lid = await Lid.findById(id);

    if (!lid) {
      return res.status(404).json({
        success: false,
        message: "Lid not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lid fetched successfully",
      innerData: lid,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//---------------------Update lid-----------------
const updateLid = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLid = await Lid.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLid) {
      return res.status(404).json({
        success: false,
        message: "Lid not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lid successfully updated",
      data: updatedLid,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//---------------------Delete lid-----------------
const deleteLid = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLid = await Lid.findByIdAndDelete(id);

    if (!deletedLid) {
      return res.status(404).json({
        success: false,
        message: "Lid not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lid successfully deleted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// -------------------------------search Lid------------------------------

const searchLid = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Lid.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday lid topilmadi" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error fetching lid", error);
    res.status(500).json({ message: "Server error: Failed to fetch lid" });
  }
};

module.exports = {
  addLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
  searchLid,
};
