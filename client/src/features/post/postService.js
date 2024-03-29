import axios from "axios";

const createPost = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.post(
    "http://localhost:8080/api/posts/",
    postData,
    config
  );

  return res.data;
};

const homePosts = async (token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get("http://localhost:8080/api/posts/home/", config);

  return res.data;
};

const likePost = async (postId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/posts/${postId}/like/`,
    postId,
    config
  );

  return res.data;
};

const deletePost = async (postId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.delete(
    `http://localhost:8080/api/posts/${postId}/`,
    config
  );

  return res.data;
};

const updatePost = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/posts/${postData._id}/`,
    postData,
    config
  );

  return res.data;
};

const getComments = async (postId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/posts/${postId}/getcomments/`,
    config
  );

  return res.data;
};

const commentPost = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/posts/${postData.postId}/comment/`,
    postData,
    config
  );

  return res.data;
};

const uncommentPost = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/posts/${postData.postId}/uncomment/`,
    postData,
    config
  );

  return res.data;
};

const updateComment = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/posts/${postData.postId}/updatecomment/`,
    postData,
    config
  );

  return res.data;
};

const userPosts = async (userId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/posts/profile/${userId}/`,
    config
  );

  return res.data;
};

const postService = {
  createPost,
  homePosts,
  likePost,
  deletePost,
  updatePost,
  getComments,
  commentPost,
  uncommentPost,
  updateComment,
  userPosts,
};

export default postService;
