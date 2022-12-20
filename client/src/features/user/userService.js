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

const userService = { getUser, updateUser };

export default userService;
