import axios from "axios";

const createConv = async (usersId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const object = {
    senderId: usersId[0],
    receiverId: usersId[1],
  };

  const res = await axios.post(
    `http://localhost:8080/api/conversations`,
    object,
    config
  );

  return res.data;
};

const getThisConv = async (usersId, token) => {
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `http://localhost:8080/api/conversations/find/${usersId[0]}/${usersId[1]}`,
    config
  );

  return res.data;
};

const conversationService = { getThisConv, createConv };

export default conversationService;
