import axios from "axios";

const createPost = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.post("api/posts/", postData, config);

  return res.data;
};

const homePosts = async (token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get("api/posts/home/", config);

  return res.data;
};

const likePost = async (postId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(`api/posts/${postId}/like`, postId, config);

  return res.data;
};

const postService = {
  createPost,
  homePosts,
  likePost,
};

export default postService;
