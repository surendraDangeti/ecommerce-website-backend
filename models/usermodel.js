const {db} = require('../db');

const queryExecuter  = (sql, param) => {
  return db.promise().query(sql, param)
    .then((result) => 
    result[0],
    ) 
    .catch((error) => {
      console.error("Database error:", error);
      throw error;
    });
}


const createUser = (username, email, password) => {
  const sql = 'INSERT INTO innozon.users(username, email, password) VALUES (?, ?, ?)';
  return queryExecuter(sql, [username, email, password])
};


const checkUser = async (email) => {
  const sql = 'SELECT * FROM innozon.users WHERE email = ?';
  try {
    const result = await queryExecuter(sql, [email]);
    console.log("us", result);
    return result;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};





const getAllUsers = async () => {
  const sql = 'SELECT * FROM users';
  return db.query(sql);
};


module.exports = {
  getAllUsers,
  createUser,
  checkUser,
  queryExecuter,
};
