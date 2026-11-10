const { Role } = require("../model/role1schema");

//-------------------addRole----------------------//
const addRole1 = async (req, res) => {
  try {
    const { name } = req.body;
    const existingRole = await Role.findOne({ name });

    console.log(existingRole);

    if (existingRole) {
      return res.status(400).json({
        succes: false,
        message: "bu nom bilan role mavjud",
      });
    } else {
      const newRole = new Role({
        name,
      });
      await newRole.save();
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

//------------------------Get role------------------------
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json({
      succes: true,
      message: "Barcha Rolelar royxati muvaffaqiyotli olindi",
      innerData: roles,
    });
  } catch (error) {
    console.error("Error fetching Roles", error);
    res.status(500).json({
      succes: false,
      message: "Server hatosi: Role olishda xato yuz berdi",
    });
  }
};

//--------------------getRoleById--------------------
const getRolebyId = async (req, res) => {
  try {
    const roleId = req.params.id;

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({ message: "role not found" });
    }
    res.json({ message: "role found", role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

//--------------------deleteRole------------------//
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByIdAndDelete(id);
    if (role) {
      res.status(200).json({
        success: true,
        message: "Role muvaffaqqiyatli o'chirildi",
        delete_role: role.firstname,
      });
    } else {
      res.status(404).json({ success: false, message: " role not found" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//--------------------------update Role------------------------//
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateRole = await Role.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!updateRole) {
      return res.status(404).json({
        success: false,
        message: "role not found",
      });
    }
    res.json({
      succes: true,
      message: "role updated sucessfully",
      role: updateRole,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------search Role-----------------//
const searchRole = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Role.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday foydalanuvchi topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching Role:", error);
    res.status(500).json({ message: "Server error: Failed to fetch Role" });
  }
};
module.exports = {
  addRole1,
  getRoles,
  getRolebyId,
  searchRole,
  updateRole,
  deleteRole,
};
