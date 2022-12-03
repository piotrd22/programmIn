const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");
const Post = require("../schemas/PostSchema");

const getUser = async (req, res) => {
  try {
    res.status(200).send(await User.findById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { password, admin } = req.body;
  const { id } = req.user;

  if (req.params.id === id || admin) {
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
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
};

const deleteUser = async (req, res) => {
  const { admin } = req.body;
  const { id } = req.user;

  if (req.params.id === id || admin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Post.deleteMany({ userId: req.params.id });
      res.status(200).send("User has been deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("you can't delete another account");
  }
};

const followUser = async (req, res) => {
  const { userId } = req.body;

  if (req.params.id !== userId) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currUser = await User.findById(userId);
      if (currUser.following.filter((x) => x === req.params.id).length === 0) {
        await currUser.updateOne({ $push: { following: req.params.id } });
        await userToFollow.updateOne({ $push: { followers: userId } });
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
};

const unfollowUser = async (req, res) => {
  const { userId } = req.body;

  if (req.params.id !== userId) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currUser = await User.findById(userId);
      if (currUser.following.filter((x) => x === req.params.id).length === 1) {
        await currUser.updateOne({ $pull: { following: req.params.id } });
        await userToUnfollow.updateOne({
          $pull: { followers: userId },
        });
        res.status(200).send("User has been unfollowed");
      } else {
        res.status(403).send("You can't unffolow an unfollowed account");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("You can't unfollow yourself");
  }
};

module.exports = { getUser, updateUser, deleteUser, followUser, unfollowUser };
