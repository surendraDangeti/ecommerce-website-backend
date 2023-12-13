const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: process.env.DB_MULTIPLE_STATEMENTS === 'true',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
});


db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});



const createTables = async(createUserTableQuery, typeoftable)=>{
  try {
    const [rows, fields] = await db.promise().query(createUserTableQuery);
    console.log(`${typeoftable} table successfully created`);
  } catch (error) {
    console.error(`Error creating ${typeoftable} table:`, error);
  }
}


const createUserTable = () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;
  createTables(createUserTableQuery, "User")
};

const createProjectsTable = () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  image LONGBLOB NOT NULL
);`;
  createTables(createTableQuery , "products")
};

const createOrderTable = ()=>{
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clientId INT,
    productId INT,
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
)
  `
  createTables(createTableQuery , "orders")
}

createUserTable()
createProjectsTable()
createOrderTable()

module.exports = {db} 