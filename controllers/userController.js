const admin = async (req, res, next) => {
  res.json({ message: "Welcome Admin" });
};

const user = async (req, res, next) => {
  res.json({ message: "Welcome User" });
};

module.exports = {
  admin,
  user,
};
