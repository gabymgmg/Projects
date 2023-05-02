import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // search for .env files

//create a instance of Pool and pass in the connectionString to its constr
const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

export default pool;