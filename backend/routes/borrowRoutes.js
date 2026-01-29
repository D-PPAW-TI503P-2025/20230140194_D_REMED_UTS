const express = require("express");
const router = express.Router();
const controller = require("../controllers/borrowController");
const { isUser, isAdmin } = require("../middleware/roleMiddleware");

router.post("/", isUser, controller.borrowBook);
router.get("/logs", isAdmin, controller.getAllLogs);

module.exports = router;
