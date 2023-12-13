const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usermodel');

const createUser = (req, res) => {
  const { username, password, email } = req.body;

  bcrypt.hash(password, 10)
    .then(hashedPassword => userModel.createUser(username,email, hashedPassword))
    .then(result => {
      let { insertId } = result;
      if (insertId && typeof insertId === 'number') {
        const token = jwt.sign({ userId: insertId, username }, 'surendra@#$_key');
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
  const { email, password } = req.body;
  userModel.checkUser(email)
    .then(users => {
      const user = users[0];

      if (user && user.id && user.password) {
        bcrypt.compare(password, user.password)
          .then(isPasswordValid => {
            console.log('isPasswordValid:', isPasswordValid);
            if (isPasswordValid) {
              const token = jwt.sign({ userId: user.id, username: user.username}, 'surendra@#$_key');
              res.status(200).json({ message: 'User exists', auth: { token, username: user.username, clientId: user.id,  isAdmin: user.admin ? true: false } });

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