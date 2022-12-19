const Post = require("../schemas/PostSchema");
const User = require("../schemas/UserSchema");
const { v4: uuidv4 } = require("uuid");

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { id } = req.user;
    const newPost = new Post({ userId: id, ...req.body });
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.user;

    const currPost = await Post.findById(req.params.id);
    if (currPost.userId === id) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send(req.params.id);
    } else {
      res.status(403).send("you can't delete not your post");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.user;

    const currPost = await Post.findById(req.params.id);
    if (currPost.userId === id) {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      const newPost = await Post.findById(req.params.id);
      res.status(200).send(newPost);
    } else {
      res.status(403).send("you can't update not your post");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.user;
    const post = await Post.findById(req.params.id);

    if (post.likes.filter((x) => x === id).length === 1) {
      await post.updateOne({ $pull: { likes: id } });
      res.status(200).send("Post has been disliked");
    } else {
      await post.updateOne({ $push: { likes: id } });
      res.status(200).send("Post has been liked");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentPost = async (req, res) => {
  try {
    const { id } = req.user;
    const { desc } = req.body;
    const post = await Post.findById(req.params.id);

    await post.updateOne({
      $push: { comments: { postedBy: id, desc: desc, id: uuidv4() } },
    });

    const newPost = await Post.findById(req.params.id);
    res.status(200).send(newPost.comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const uncommentPost = async (req, res) => {
  try {
    const { id } = req.user;
    const { desc } = req.body;
    const post = await Post.findById(req.params.id);

    if (
      post.userId === id ||
      post.comments.filter(
        (comment) =>
          comment.postedBy === id &&
          comment.desc === desc &&
          comment.id === req.body.id
      ).length === 1
    ) {
      await post.updateOne({
        $pull: { comments: { id: req.body.id } },
      });

      const newPost = await Post.findById(req.params.id);
      res.status(200).send(newPost.comments);
    } else {
      res.status(403).send("you can't delete not your comment");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.user;
    const { desc } = req.body;
    const post = await Post.findById(req.params.id);

    if (
      post.userId === id ||
      post.comments.filter(
        (comment) =>
          comment.postedBy === id &&
          comment.desc === desc &&
          comment.id === req.body.id
      ).length === 1
    ) {
      await Post.updateOne(
        { _id: req.params.id, "comments.id": req.body.id },
        {
          $set: { "comments.$.desc": desc },
        }
      );

      const newPost = await Post.findById(req.params.id);
      res.status(200).send(newPost.comments);
    } else {
      res.status(403).send("you can't update not your comment");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post.comments);
  } catch {
    res.status(500).send(error);
  }
};

const homePosts = async (req, res) => {
  try {
    const { id } = req.user;

    const currUser = await User.findById(id);
    const currUserPosts = await Post.find({ userId: id });
    const followersPosts = await Promise.all(
      currUser.following.map((f_id) => {
        return Post.find({ userId: f_id });
      })
    );

    res.status(200).send([...currUserPosts, ...followersPosts]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const userPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).send(posts);
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
  homePosts,
  userPosts,
  getComments,
  updateComment,
};
