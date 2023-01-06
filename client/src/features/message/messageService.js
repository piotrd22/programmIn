import axios from "axios";

const createMess = async (messData, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.post(
    `http://localhost:8080/api/messages`,
    messData,
    config
  );

  return res.data;
};

const getMess = async (convId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/messages/${convId}`,
    config
  );

  return res.data;
};

const messageService = { getMess, createMess };

export default messageService;
