const express = require('express');
const app = express();
const cors = require('cors');
const { router } = require('./Routers/UserRouters');
const {productsRoute} = require('./Routers/Products.js')
const db = require('./db.js');

let port = 3005;

app.use(express.json());
app.use(cors())

// if (db.checkConnection()) {
//   console.log('db is connected');
// } else {
//   console.log('db is not connected',);
// }

app.use('/auth', router);
app.use('/', productsRoute)

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
