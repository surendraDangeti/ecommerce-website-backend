const express = require('express');
const app = express();
const { router } = require('./Routers/UserRouters');
const db = require('./db.js');

let port = 3000;

app.use(express.json());

if (db.isConnected()) {
  console.log('db is connected');
} else {
  console.log('db is not connected');
}

app.use('/auth', router);

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
