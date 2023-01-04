const router = require("express").Router();
const conversationsController = require("../controllers/conversationsController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, conversationsController.createConv);

router.get("/:id", verifyToken, conversationsController.getConv);

router.get(
  "/find/:firstId/:secondId",
  verifyToken,
  conversationsController.getThisConv
);

module.exports = router;
