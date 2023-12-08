const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usermodel');

const createUser = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hashedPassword => userModel.createUser(username, hashedPassword))
    .then(result => {
      let { insertId } = result;
      if (insertId && typeof insertId === 'number') {
        const token = jwt.sign({ userId: insertId, username }, 'secret_key');
        res.status(200).json({ message: 'Your account is created successfully', token });
        console.log(result);
      } else {
        res.status(404).send('There is an issue in creating the account');
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
};

const checkUser = (req, res) => {
  const { username, password } = req.body;
  
  userModel.checkUser(username)
    .then(users => {
      const user = users[0];
      if (user && user.id && user.password) {
        bcrypt.compare(password, user.password)
          .then(isPasswordValid => {
            console.log('isPasswordValid:', isPasswordValid);
            if (isPasswordValid) {
              const token = jwt.sign({ userId: user.id, username }, 'secret_key');
              res.status(200).json({ message: 'User exists', token });
            } else {
              console.log('Invalid password');
              res.status(404).send('Invalid password');
            }
          })
          .catch(bcryptError => {
            console.error(bcryptError);
            res.status(500).send('Internal Server Error');
          });
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
};


module.exports = {
  createUser,
  checkUser,
};