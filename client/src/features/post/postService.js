import axios from "axios";

const createPost = async (postData, token) => {
  const config = {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  };

  const res = await axios.post("/api/posts/", postData, config);

  return res.data;
};

const postService = {
  createPost,
};

export default postService;
