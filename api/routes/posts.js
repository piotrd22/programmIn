const router = require("express").Router();
const postsControllers = require("../controllers/postsControllers");

router.get("/:id", postsControllers.getPost);

router.post("/", postsControllers.createPost);

router.delete("/:id", postsControllers.deletePost);

router.put("/:id", postsControllers.updatePost);

router.put("/:id/like", postsControllers.likePost);

router.put("/:id/comment", postsControllers.commentPost);

router.put("/:id/uncomment", postsControllers.uncommentPost);

router.get("/home/posts", postsControllers.homePosts);

module.exports = router;
