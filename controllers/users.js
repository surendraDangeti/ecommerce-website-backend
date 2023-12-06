const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await userModel.createUser(username, password);
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
