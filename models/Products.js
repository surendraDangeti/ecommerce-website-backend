const { db } = require('../db.js');

const queryExecuter = (sql) => {
  return db.promise().query(sql)
    .then((result) => result[0]) 
    .catch((error) => {
      console.error("Database error:", error);
      throw error;
    });
}

const queryExecuterwithValues = (sql, param) => {
    return db.promise().query(sql, param)
      .then((result) => result[0]) 
      .catch((error) => {
        console.error("Database error:", error);
        throw error;
      });
  }
  

const getAllProducts = async() => {
  return queryExecuter('SELECT * FROM products');
};

const addProducts = async (name, description, price, image) => {
    const sql =
      'INSERT INTO innozon.products(name, description, price , image) VALUES (?, ?, ?, ?)';
    return queryExecuterwithValues(sql, [name, description, price, image]);
  };
  
  

module.exports = { getAllProducts, addProducts };
