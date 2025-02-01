const express = require("express");
const router = express.Router();

const { admin, user } = require("../controllers/userController");
const authorizeRoles = require("../middleware/roleMiddleware");
const verifyToken = require("../middleware/authMiddleware");

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "user"),
  (req, res) => {
    res.json({ message: "Welcome User" });
  }
);

module.exports = router;
