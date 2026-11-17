const { Stuff2 } = require("../model/stuff2schema");

//-----------------------addStuff2------------------------//
const addStuff2 = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const existingStuff = await Stuff2.findOne({ login });

    console.log(existingStuff);

    if (existingStuff) {
      return res.status(400).json({
        success: false,
        message: "bu login bilan stuff mavjud",
      });
    } else {
      const newStuff = new Stuff2({
        first_name,
        last_name,
        phone_number,
        login,
        parol,
        is_active,
      });
      await newStuff.save();
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

//------------------------Get stuff2--------------------------//
const getStuff2 = async (req, res) => {
  try {
    const stuffs = await Stuff2.find({});
    res.json({
      success: true,
      message: "Barcha Stufflar royxati muvaffaqiyatli olindi",
      innerData: stuffs,
    });
  } catch (error) {
    console.error("Error fetching Stuff", error);
    res.status(500).json({
      success: false,
      message: "Server hatosi: Stuff olishda xato yuz berdi",
    });
  }
};

//--------------------getStuff2ById--------------------
const getStuff2ById = async (req, res) => {
  try {
    const stuffId = req.params.id;

    const stuff = await Stuff2.findById(stuffId);

    if (!stuff) {
      return res.status(404).json({ message: "stuff not found" });
    }
    res.json({ message: "stuff found", stuff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

//--------------------deleteStuff2--------------------//
const deleteStuff2 = async (req, res) => {
  try {
    const { id } = req.params;

    const stuff = await Stuff2.findByIdAndDelete(id);
    if (stuff) {
      res.status(200).json({
        success: true,
        message: "Stuff muvaffaqqqiyatli o'chirildi",
        delete_stuff: stuff.first_name,
      });
    } else {
      res.status(404).json({ success: false, message: "stuff not found" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//--------------------------update Stuff2-------------------------//
const updateStuff2 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStuff = await Stuff2.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateStuff) {
      return res.status(404).json({
        success: false,
        message: "stuff not found",
      });
    }
    res.json({
      success: true,
      message: "stuff updated sucessfullye",
      stuff: updateStuff,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------search Stuff-----------------//
const searchStuff = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Stuff2.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Stuff:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Stuff" });
  }
};

module.exports = {
  addStuff2,
  getStuff2,
  getStuff2ById,
  updateStuff2,
  deleteStuff2,
  searchStuff
};
