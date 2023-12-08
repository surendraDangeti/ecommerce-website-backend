const {db} = require('../db');

const queryExecuter = (sql,param)=>{
  return db.promise().query(sql, param).then(([rows])=> rows)
  .catch((error) => {
    console.error("Database error:", error);
    throw error;
  });
}

const createUser = (username, password) => {
  const sql = 'INSERT INTO innozon.users(username, password) VALUES (?, ?)';
  return queryExecuter(sql, [username, password])
};


const checkUser = (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  return queryExecuter(sql, [username]) 
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
