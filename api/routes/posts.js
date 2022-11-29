const router = require("express").Router();
const postsControllers = require("../controllers/postsControllers");

router.post("/", postsControllers.createPost);

router.delete("/:id", postsControllers.deletePost);

router.put("/:id", postsControllers.updatePost);

module.exports = router;
