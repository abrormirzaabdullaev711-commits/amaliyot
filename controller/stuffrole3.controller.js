const { StuffRole3 } = require("../model/stuffrole3Schema");

//-------------------add Stuff Role----------------------//
const addStuffRole3 = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;
    const existingRelation = await StuffRole3.findOne({ stuff_id, role_id });

    console.log(existingRelation);

    if (existingRelation) {
      return res.status(400).json({
        success: false,
        message: "bu stuff_role mavjud",
      });
    } else {
      const newStuffRole = new StuffRole3({
        stuff_id,
        role_id,
      });
      await newStuffRole.save();
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

//------------------------Get stuff role------------------------
const getStuffRole3 = async (req, res) => {
  try {
    const stuffRoles = await StuffRole3.find({}).populate("stuff_id").populate("role_id");
    res.json({
      success: true,
      message: "Barcha StuffRole3lar royxati muvaffaqiyatli olindi",
      innerData: stuffRoles,
    });
  } catch (error) {
    console.error("Error fetching StuffRole3", error);
    res.status(500).json({
      success: false,
      message: "Server hatosi: StuffRole3 olishda xato yuz berdi",
    });
  }
};

//--------------------get Stuff Role By Id------------------------//
const getStuffRole3ById = async (req, res) => {
  try {
    const stuffRoleId = req.params.id;

    const stuffRole = await StuffRole3.findById(stuffRoleId).populate("stuff_id").populate("role_id");

    if (!stuffRole) {
      return res.status(404).json({ message: "stuff_role not found" });
    }
    res.json({ message: "stuff_role found", stuffRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

//--------------------delete stuff role ----------------------//
const deleteStuffRole3 = async (req, res) => {
  try {
    const { id } = req.params;

    const stuffRole = await StuffRole3.findByIdAndDelete(id);
    if (stuffRole) {
      res.status(200).json({
        success: true,
        message: "StuffRole muvaffaqqiyatli o'chirildi",
        delete_stuff_role: stuffRole._id,
      });
    } else {
      res.status(404).json({ success: false, message: "stuff_role not found" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//------------------------------update StuffRole3------------------------//
const updateStuffRole3 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStuffRole = await StuffRole3.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateStuffRole) {
      return res.status(404).json({
        success: false,
        message: "stuff_role not found",
      });
    }
    res.json({
      success: true,
      message: "stuff_role updated sucessfully",
      stuff_role: updateStuffRole,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------search StuffRole-----------------//
const searchStuffRole = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await StuffRole3.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching StuffRole:", error);
    res.status(500).json({ message: "Server error: Failed to fetch StuffRole" });
  }
};

module.exports = {
  addStuffRole3,
  getStuffRole3,
  getStuffRole3ById,
  updateStuffRole3,
  deleteStuffRole3,
  searchStuffRole
};