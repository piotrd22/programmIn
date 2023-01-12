const router = require("express").Router();
const messagesController = require("../controllers/messagesController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, messagesController.createMess);

router.get("/:convId", verifyToken, messagesController.getMess);

module.exports = router;
