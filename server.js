const express = require('express');
const app = express();
const cors = require('cors');
const { router } = require('./Routers/UserRouters');
const {OrderRoute} = require("./Routers/Order")
const {productsRoute} = require('./Routers/Products.js')
const db = require('./db.js');

let port = process.env.SERVER_PORT;

app.use(express.json({limit: '10mb'}));
app.use(cors())

// if (db.checkConnection()) {
//   console.log('db is connected');
// } else {
//   console.log('db is not connected',);
// }

app.use('/auth', router);
app.use('/auth', OrderRoute)
app.use('/', productsRoute)


app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
