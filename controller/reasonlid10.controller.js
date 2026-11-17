const { Reasonlid10 } = require("../model/reasonlid10Schema");

//-------------------addReasonlid----------------------//
const addReasonlid = async (req, res) => {
  try {
    const { reasonlid } = req.body;
    const existingReasonlid = await Reasonlid10.findOne({ reasonlid });

    console.log(existingReasonlid);

    if (existingReasonlid) {
      return res.status(400).json({
        succes: false,
        message: "bu nom bilan Reasonlid mavjud",
      });
    } else {
      const newReasonlid = new Reasonlid10({
        reasonlid,
      });
      await newReasonlid.save();
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

//-----------------------Get Reasonlid-------------------//
const getReasonlids = async (req, res) => {
  try {
    const ReasonLid = await Reasonlid10.find({});
    res.json({
      succes: true,
      message: "Barcha statuslar royxati muvaffaqiyotli olindi",
      innerData: ReasonLid,
    });
  } catch (error) {
    console.error("Error fetching ReasonLId", error);
    res.status(500).json({
      succes: false,
      message: "Server hatosi: ReasonLid olishda xato yuz berdi",
    });
  }
};

//----------------------------------getReasonlidById-----------------------//
const getReasonlidById = async (req, res) => {
  try {
    const ReasonlidId = req.params.id;

    const Reasonlid = await Reasonlid10.findById(ReasonlidId);

    if (!Reasonlid) {
      return res.status(404).json({ message: "Reasonlid not found" });
    }
    res.json({ message: "reasonlid found", Reasonlid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "interval server Error" });
  }
};

//----------------------deleteReasonLid-------------------//
const deleteReasonlid = async (req, res) => {
  try {
    const { id } = req.params;

    const Reasonlid = await Reasonlid10.findByIdAndDelete(id);

    if (Reasonlid) {
      return res.status(200).json({
        succes: true,
        message: "reasonlid muvaffaqiyatli o'chirildi",
        delete_reasonlid: Reasonlid10.reasonlid,
      });
    } else {
      res.status(404).json({ succes: false, message: "reasonlid not found" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      succes: false,
      message: "Interval server error",
    });
  }
};

//-----------------------------updateReasonLid----------------------------//
const updateReasonlid = async (req, res) => {
  try {
    const { id } = req.params;
    const { reasonlid } = req.body;
    const updateReasonLid = await Reasonlid10.findByIdAndUpdate(
      id,
      { reasonlid },
      { new: true },
    );
    if (!updateReasonLid) {
      return res.status(404).json({
        succes: false,
        message: "Reason Lid not found",
      });
    }
    res.json({
      succes: true,
      message: "reasonlid updated succesfully",
      data: updateReasonLid,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      succes: false,
      message: "Interval server Error",
    });
  }
};

//----------------------search Reasonlid-----------------//
const searchReasonlid = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Reasonlid.find({
      $or: [{ reasonlid: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Reasonlid:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Reasonlid" });
  }
};

module.exports = {
  addReasonlid,
  getReasonlids,
  getReasonlidById,
  updateReasonlid,
  deleteReasonlid,
  searchReasonlid

}