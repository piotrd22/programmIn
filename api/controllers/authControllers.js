const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/UserSchema");

const signup = async (req, res) => {
  try {
    const { name, surname, email, password, gender, nationality, date } =
      req.body;

    if ((await User.find({ email: email })).length === 1) {
      return res.status(405).send("Email is already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassw = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassw,
      gender: gender,
      nationality: nationality,
      date: date,
    });

    await newUser.save();

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email } = req.body;

    const log_user = await User.findOne({
      email: email,
    });
    if (!log_user) {
      return res.status(404).send("404 USER NOT FOUND");
    }

    const userPassw = await bcrypt.compare(
      req.body.password,
      log_user.password
    );
    if (!userPassw) {
      return res.status(409).send("409 WRONG PASSWORD");
    }

    const accessToken = jwt.sign(
      { id: log_user._id, admin: log_user.admin },
      process.env.SECRET,
      { expiresIn: "5d" }
    );

    const { password, ...rest } = log_user._doc;

    res.status(200).send({ ...rest, accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { signin, signup };
