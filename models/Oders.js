
const { db } = require('../db.js');

const queryExecuterwithValues = (sql, params) => {
    return db.promise().query(sql, params)
        .then((result) => result[0])
        .catch((error) => {
            console.error("Database error:", error);
            throw error;
        });
}

const queryExecuter = (sql) => {
    return db.promise().query(sql)
      .then((result) => result[0]) 
      .catch((error) => {
        console.error("Database error:", error);
        throw error;
      });
  }

class OrderModel {
    static createOrder(clientId, productId, quantity) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO orders (clientId, productId, quantity) VALUES (?, ?, ?)';
            const values = [clientId, productId, quantity];

            queryExecuterwithValues(sql, values)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getAllOrders(){
        return queryExecuter('SELECT * FROM orders');
    }
}



module.exports = OrderModel;
