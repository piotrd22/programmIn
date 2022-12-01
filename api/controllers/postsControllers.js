const Post = require("../schemas/PostSchema");

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch {
    res.status(500).send(error);
  }
};

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

const likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (post.likes.filter((x) => x === userId).length === 1) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).send("Post has been disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).send("Post has been liked");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentPost = async (req, res) => {
  try {
    const { userId, desc } = req.body;
    const post = await Post.findById(req.params.id);

    await post.updateOne({
      $push: { comments: { postedBy: userId, desc: desc } },
    });
    res.status(200).send("Post has been commented");
  } catch (error) {
    res.status(500).send(error);
  }
};

const uncommentPost = async (req, res) => {
  try {
    const { userId, desc } = req.body;
    const post = await Post.findById(req.params.id);

    await post.updateOne({
      $pull: { comments: { postedBy: userId, desc: desc } },
    });
    res.status(200).send("Post has been uncommented");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost,
  commentPost,
  uncommentPost,
};
