const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const verifyToken = require("../middleware/verifyToken");

router.get("/:id", usersControllers.getUser);

router.put("/:id", verifyToken, usersControllers.updateUser);

router.delete("/:id", verifyToken, usersControllers.deleteUser);

router.put("/:id/follow", verifyToken, usersControllers.followUser);

router.put("/:id/unfollow", verifyToken, usersControllers.unfollowUser);

module.exports = router;
