//importing module
const { Client } = require('pg');

//Database connection with dialect of postgres specifying the database used
const client = new Client(process.env.DB_URL);


//Define a "users" table with the appropriate columns and data types
const createUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;
  try {
    const res = await client.query(createTableQuery);
    console.log('User table created');
  } catch (err) {
    console.error('Error creating user table:', err);
  }
};

//Create the "users" table
createUserTable();

module.exports = client;