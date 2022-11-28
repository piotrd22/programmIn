const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");

router.get("/:id", usersControllers.getUser);

router.put("/:id", usersControllers.updateUser);

router.delete("/:id", usersControllers.deleteUser);

router.put("/:id/follow", usersControllers.followUser);

router.put("/:id/unfollow", usersControllers.unfollowUser);

module.exports = router;
