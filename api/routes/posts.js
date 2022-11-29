const router = require("express").Router();
const postsControllers = require("../controllers/postsControllers");

router.post("/", postsControllers.createPost);

router.delete("/:id", postsControllers.deletePost);

module.exports = router;
