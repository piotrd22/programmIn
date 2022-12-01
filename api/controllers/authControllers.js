const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

const signup = async (req, res) => {
  try {
    const { name, surname, email, password, gender } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassw = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassw,
      gender: gender,
    });

    await newUser.save();

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send("Email already taken!");
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const log_user = await User.findOne({
      email: email,
    });
    if (res.status(404) && !log_user) {
      res.send("404 USER NOT FOUND");
    }

    const userPassw = await bcrypt.compare(password, log_user.password);
    if (res.status(404) && !userPassw) {
      res.send("404 WRONG PASSWORD");
    }

    res.status(200).send(log_user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { signin, signup };
