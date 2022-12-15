import axios from "axios";

const signup = async (user) => {
  const res = await axios.post(`api/auth/signup`, user);
  return res;
};

const authService = {
  signup,
};

export default authService;
