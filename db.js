const mysql = require('mysql2/promise');
// const { createUserTable } = require("./models/usermodal");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Dangeti11',
  database: 'innozon',
  waitForConnections: true,
  connectionLimit: 10,
});

let isConnected = false;

const createUserTable = async () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
    )
  `;

  await db.execute(createUserTableQuery);
};

const checkConnection = async () => {
  try {
    await pool.query('SELECT 1');
    isConnected = true;
    createUserTable()
  } catch (error) {
    console.error(error.message);
    isConnected = false;
  } finally {
    console.log("testing");;
  }
};

const query = async (sql, params) => {
  await checkConnection();
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const execute = async (sql, params) => {
  await checkConnection();
  try {
    const [result, fields] = await pool.execute(sql, params);
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  query,
  execute,
  checkConnection,
  isConnected: () => isConnected,
};
