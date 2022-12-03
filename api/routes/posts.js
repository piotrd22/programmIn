const router = require("express").Router();
const postsControllers = require("../controllers/postsControllers");
const verifyToken = require("../verifyToken");

router.get("/:id", postsControllers.getPost);

router.post("/", verifyToken, postsControllers.createPost);

router.delete("/:id", verifyToken, postsControllers.deletePost);

router.put("/:id", verifyToken, postsControllers.updatePost);

router.put("/:id/like", verifyToken, postsControllers.likePost);

router.put("/:id/comment", verifyToken, postsControllers.commentPost);

router.put("/:id/uncomment", verifyToken, postsControllers.uncommentPost);

router.get("/posts/:id", verifyToken, postsControllers.homePosts);

module.exports = router;
