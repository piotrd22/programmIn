const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");
const Post = require("../schemas/PostSchema");
const fs = require("fs");

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

  const currUser = await User.findById(req.params.id);

  if (req.params.id === id || admin) {
    if ((await User.find({ email: req.body.email })).length === 1) {
      return res.status(405).send("Email is already taken");
    }

    if (req.body.profilePicture) {
      try {
        fs.unlinkSync(`api/public/images/${currUser.profilePicture}`);
        console.log("File removed");
      } catch (error) {
        console.error(error);
      }
    }

    if (req.body.backPicture) {
      try {
        fs.unlinkSync(`api/public/images/${currUser.backPicture}`);
        console.log("File removed");
      } catch (error) {
        console.error(error);
      }
    }

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

  const currUser = await User.findById(req.params.id);

  if (req.params.id === id || admin) {
    if (currUser.profilePicture) {
      try {
        fs.unlinkSync(`api/public/images/${currUser.profilePicture}`);
        console.log("File removed");
      } catch (error) {
        console.error(error);
      }
    }

    if (currUser.backPicture) {
      try {
        fs.unlinkSync(`api/public/images/${currUser.backPicture}`);
        console.log("File removed");
      } catch (error) {
        console.error(error);
      }
    }

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
  const { id } = req.user;

  if (req.params.id !== id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currUser = await User.findById(id);
      if (currUser.following.filter((x) => x === req.params.id).length === 0) {
        await currUser.updateOne({ $push: { following: req.params.id } });
        await userToFollow.updateOne({ $push: { followers: id } });
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
  const { id } = req.user;

  if (req.params.id !== id) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currUser = await User.findById(id);
      if (currUser.following.filter((x) => x === req.params.id).length === 1) {
        await currUser.updateOne({ $pull: { following: req.params.id } });
        await userToUnfollow.updateOne({
          $pull: { followers: id },
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

const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user.followers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user.following);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchUsers = async (req, res) => {
  try {
    const { keyword } = req.query;

    const users = await User.aggregate([
      {
        $project: {
          username: { $concat: ["$name", " ", "$surname"] },
          email: 1,
          name: 1,
          surname: 1,
          profilePicture: 1,
        },
      },
      { $match: { username: { $regex: new RegExp(keyword), $options: "i" } } },
    ]);

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
  searchUsers,
};
