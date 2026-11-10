const { Status } = require("../model/status1schema");

//-------------------addStatus----------------------//
const addStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const existingStatus = await Status.findOne({ name });

    console.log(existingStatus);

    if (existingStatus) {
      return res.status(400).json({
        succes: false,
        message: "bu nom bilan Status mavjud",
      });
    } else {
      const newStatus = new Status({
        name,
      });
      await newStatus.save();
      return res.status(201).json({
        succes: true,
        message: "royxatdan o'tish muvaffaqiyotli yakunlandi",
      });
    }
  } catch (error) {
    console.error("Xato", error);
    return res.status(500).json({
      succes: false,
      message: "Interval server error",
    });
  }
};

//------------------------Get Status------------------------
const getStatuss = async (req, res) => {
  try {
    const Statuss = await Status.find({});
    res.json({
      succes: true,
      message: "Barcha Statuslar royxati muvaffaqiyotli olindi",
      innerData: Statuss,
    });
  } catch (error) {
    console.error("Error fetching Statuss", error);
    res.status(500).json({
      succes: false,
      message: "Server hatosi: Status olishda xato yuz berdi",
    });
  }
};

//--------------------getStatusById--------------------
const getStatusbyId = async (req, res) => {
  try {
    const StatusId = req.params.id;

    const Status = await Status.findById(StatusId);

    if (!Status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.json({ message: "Status found", Status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

//--------------------deleteStatus------------------//
const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const Status = await Status.findByIdAndDelete(id);
    if (Status) {
      res.status(200).json({
        success: true,
        message: "Status muvaffaqqiyatli o'chirildi",
        delete_Status: Status.firstname,
      });
    } else {
      res.status(404).json({ success: false, message: " Status not found" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//--------------------------update Status------------------------//
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateStatus = await Status.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!updateStatus) {
      return res.status(404).json({
        success: false,
        message: "Status not found",
      });
    }
    res.json({
      succes: true,
      message: "Status updated sucessfully",
      Status: updateStatus,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------search Status-----------------//
const searchStatus = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Status.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Status:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Status" });
  }
};
module.exports = {
  addStatus,
  getStatuss,
  getStatusbyId,
  searchStatus,
  updateStatus,
  deleteStatus,
};
