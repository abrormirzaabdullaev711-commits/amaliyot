const { Branch5 } = require("../model/branch5schema");

//-------------------addBranch5------------------------//
const addBranch5 = async (req, res) => {
  try {
    const { name, address, call_number } = req.body;
    const existingBranch = await Branch5.findOne({ name });

    console.log(existingBranch);

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: "bu nom bilan branch mavjud",
      });
    } else {
      const newBranch = new Branch5({
        name,
        address,
        call_number,
      });
      await newBranch.save();
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

//--------------------------Get branch5-----------------------------//
const getBranch5 = async (req, res) => {
  try {
    const branches = await Branch5.find({});
    res.json({
      success: true,
      message: "Barcha Branch5 lar royxati muvaffaqiyatli olindi",
      innerData: branches,
    });
  } catch (error) {
    console.error("Error fetching Branch5", error);
    res.status(500).json({
      success: false,
      message: "Server hatosi: Branch5 olishda xato yuz berdi",
    });
  }
};

//--------------------getBranch5ById---------------------------------//
const getBranch5ById = async (req, res) => {
  try {
    const branchId = req.params.id;

    const branch = await Branch5.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: "branch not found" });
    }
    res.json({ message: "branch found", branch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

//-------------------------------------deleteBranch5-----------------------------------//
const deleteBranch5 = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch5.findByIdAndDelete(id);
    if (branch) {
      res.status(200).json({
        success: true,
        message: "Branch muvaffaqqiyatli o'chirildi",
        delete_branch: branch.name,
      });
    } else {
      res.status(404).json({ success: false, message: "branch not found" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//---------------------------update Branch5-----------------------------//
const updateBranch5 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBranch = await Branch5.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateBranch) {
      return res.status(404).json({
        success: false,
        message: "branch not found",
      });
    }
    res.json({
      success: true,
      message: "branch updated sucessfully",
      branch: updateBranch,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addBranch5,
  getBranch5,
  getBranch5ById,
  updateBranch5,
  deleteBranch5,
};