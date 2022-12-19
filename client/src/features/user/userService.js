import axios from "axios";

const getUser = async (userId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(`api/users/${userId}`, config);

  return res.data;
};

const userService = { getUser };

export default userService;
