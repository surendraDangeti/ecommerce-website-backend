const { getAllProducts, addProducts } = require("../models/Products");

const getProducts = (req, res) => {
  getAllProducts()
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
};

const addnewProduct = (req, res)=>{
    const {name, description,price, image} = req.body
    addProducts(name, description,price, image)
    .then((data) => {
        res.status(200).json({ success: true, message: "Your product is successfully add to inezon" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      });
}

module.exports = { getProducts ,  addnewProduct};
