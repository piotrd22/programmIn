const Conversation = require("../schemas/ConversationSchema");

const createConv = async (req, res) => {
  try {
    const newConv = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const saved = await newConv.save();
    res.status(200).send(saved);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConv = async (req, res) => {
  try {
    const conv = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).send(conv);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getThisConv = async (req, res) => {
  try {
    const conv = await Conversation.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    if (!conv) return res.status(404).send("404");

    res.status(200).send(conv);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createConv, getConv, getThisConv };
