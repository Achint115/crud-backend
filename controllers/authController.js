const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   try {
//     const { name, email, password, role, phoneNumber } = req.body;

//     const hashPassword = await bcryptjs.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashPassword,
//       role,
//       phoneNumber,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const register = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      phoneNumber,
    });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ token, user: {
      userId: user._id,
      role: user.role,
      name: user.name,
      email:user.email
    }});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
