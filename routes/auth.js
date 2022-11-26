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
      nationality: req.body.nationality,
    });

    await newUser.save();

    res.status(200);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
