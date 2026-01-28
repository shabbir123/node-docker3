const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
exports.signUp = async (req, res, next) => {

  const { username, password } = req.body;

  try {

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashPassword,
    });

    res.status(201).send({
      status: "success",
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(400).send({
      status: "fail",
    })
  }
};


exports.login = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ status: 'fail', message: 'user not found' });
    }
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;
      res.status(200).send({
        status: "success",
      })
    }
    else {
      res.status(401).send({
        status: "fail",
        message: "invalid password"
      })
    }

  } catch (error) {
    res.status(400).send({
      status: "fail",
      error: error.message
    })
  }
};

