const Post = require("../schemas/PostSchema");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId } = req.body;

    const currPost = await Post.findById(req.params.id);
    if (currPost.userId === userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send("Post has been deleted");
    } else {
      res.status(403).send("you can't delete not your post");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { userId } = req.body;

    const currPost = await Post.findById(req.params.id);
    if (currPost.userId === userId) {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send("Post has been updated");
    } else {
      res.status(403).send("you can't update not your post");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createPost, deletePost, updatePost };
