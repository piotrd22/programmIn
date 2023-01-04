const Message = require("../schemas/MessageSchema");

const createMess = async (req, res) => {
  try {
    const newMess = new Message(req.body);
    const saved = await newMess.save();
    res.status(200).send(saved);
  } catch (error) {
    res.status(200).send(error);
  }
};

const getMess = async (req, res) => {
  try {
    const messages = await Message.find({ convId: req.params.convId });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createMess, getMess };
