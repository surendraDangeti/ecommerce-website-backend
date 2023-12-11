const { getAllProducts, addProducts } = require("../models/Products");

const getProducts = (req, res) => {
  getAllProducts()
    .then((data) => {
      data.forEach(product => {
        if (product.image && Buffer.isBuffer(product.image)) {
          product.image = product.image.toString('base64');
        }
      });

      res.status(200).json({ success: true, data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
};


const addnewProduct = (req, res) => {
  const { name, description, price, image } = req.body;
  // const imageBuffer = Buffer.from(image, 'base64');
  addProducts(name, description, price, image)
    .then((data) => {
      res.status(200).json({ success: true, message: "Your product is successfully added to inezon" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
};


module.exports = { getProducts ,  addnewProduct};
