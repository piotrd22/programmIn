const router = require("express").Router();
const postsControllers = require("../controllers/postsControllers");

router.post("/", postsControllers.createPost);

module.exports = router;
