const router = require("express").Router();
const User = require("../schemas/UserSchema");

router.post("/signup", async (req, res) => {
  const newUser = await new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newUser.save();
    res.status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
