const router = require("express").Router();
const postsControllers = require("../controllers/postsControllers");
const verifyToken = require("../middleware/verifyToken");

router.get("/home", verifyToken, postsControllers.homePosts);

router.post("/", verifyToken, postsControllers.createPost);

router.get("/:id", verifyToken, postsControllers.getPost);

router.delete("/:id", verifyToken, postsControllers.deletePost);

router.put("/:id", verifyToken, postsControllers.updatePost);

router.put("/:id/like", verifyToken, postsControllers.likePost);

router.put("/:id/comment", verifyToken, postsControllers.commentPost);

router.put("/:id/uncomment", verifyToken, postsControllers.uncommentPost);

router.get("/:id/getcomments", verifyToken, postsControllers.getComments);

router.get("/profile/:id", verifyToken, postsControllers.userPosts);

module.exports = router;
