const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

router.get("/:id", async (req, res) => {
  try {
    res.status(200);
    res.send(await User.findById(req.params.id));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.userId || req.body.admin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).send(error);
      }
    }

    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200);
      res.send("User has been updated");
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.status(403), send("you can't update another account");
  }
});

module.exports = router;
