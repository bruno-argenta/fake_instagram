const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getImage } = require("../controllers/imageController");
const router = express.Router();

router.get("/:filename", protect, getImage);

module.exports = router;
