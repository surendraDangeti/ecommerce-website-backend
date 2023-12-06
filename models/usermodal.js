const db = require('../db');


const createUser = async (username, password) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  return db.execute(sql, [username, password]);
};

const getAllUsers = async () => {
  const sql = 'SELECT * FROM users';
  return db.query(sql);
};

// const createUserTable = async () => {
//   const createUserTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       username VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL,
//     )
//   `;

//   await db.execute(createUserTableQuery);
// };

module.exports = {
  getAllUsers,
  createUser,
  // createUserTable,
};
