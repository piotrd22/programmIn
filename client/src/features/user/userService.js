import axios from "axios";

const getUser = async (userId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/users/${userId}`,
    config
  );

  return res.data;
};

const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/users/${userId}`,
    userData,
    config
  );

  return res.data;
};

const deleteUser = async (userData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.delete(
    `http://localhost:8080/api/users/${userData._id}`,
    config
  );

  return res.data;
};

const followUser = async (userData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/users/${userData._id}/follow`,
    userData,
    config
  );

  return res.data;
};

const unfollowUser = async (userData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.put(
    `http://localhost:8080/api/users/${userData._id}/unfollow`,
    userData,
    config
  );

  return res.data;
};

const getUserFollowers = async (userId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/users/${userId}/followers`,
    config
  );

  return res.data;
};

const getUserFollowing = async (userId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/users/${userId}/followings`,
    config
  );

  return res.data;
};

const userService = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
};

export default userService;
