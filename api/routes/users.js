const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await User.findById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.userId || req.body.admin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).send(error);
      }
    }

    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send("User has been updated");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("you can't update another account");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.userId || req.body.admin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("you can't delete another account");
  }
});

router.put("/:id/follow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      if (currUser.following.filter((x) => x === req.params.id).length === 0) {
        await currUser.updateOne({ $push: { following: req.params.id } });
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        res.status(200).send("User has been followed");
      } else {
        res.status(403).send("User has been already followed");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("You can't follow yourself");
  }
});

module.exports = router;
