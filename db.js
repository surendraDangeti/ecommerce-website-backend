const mysql = require('mysql2');
const db =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dangeti11',
  database: 'innozon',
  multipleStatements: true,
  connectionLimit: 10
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
    image BLOB NOT NULL
  );
  `;
  createTables(createTableQuery , "products")
};


createUserTable()
createProjectsTable()

module.exports = {db} 