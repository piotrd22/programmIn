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

module.exports = { createPost };
