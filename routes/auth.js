const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassw = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassw,
      gender: req.body.gender,
    });

    await newUser.save();

    res.status(200);
    res.send(newUser);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const log_user = await User.findOne({
      email: req.body.email,
    });
    if (res.status(404) && !log_user) {
      res.send("404 USER NOT FOUND");
    }

    const userPassw = await bcrypt.compare(
      req.body.password,
      log_user.password
    );
    if (res.status(404) && !userPassw) {
      res.send("404 WRONG PASSWORD");
    }

    res.status(200);
    res.send(log_user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
