const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router.post("/signup", authControllers.signup);

router.post("/signin", authControllers.signin);

module.exports = router;
