import pool from './pool';

pool.on('connect', () => {
    console.log('connected to the db');
});


const createUserTable = async () => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOL DEFAULT(false),
        created_on DATE
    );`
    try {
        const res = await pool.query(createTableQuery);
        console.log('User table created');
    } catch (err) {
        console.error('Error creating user table:', err);
        pool.end();
    }
};

const createTableTips = async () => {
    const createTipsQuery = `CREATE TABLE IF NOT EXISTS tips (
        id SERIAL PRIMARY KEY, 
        user_id INTEGER REFERENCES users(id),
        tip_category VARCHAR(100),
        tip_content TEXT NOT NULL,
        created_on DATE
        )`;
    
    try {
        const res = await pool.query(createTipsQuery);
        console.log('User tip created');
    } catch (err) {
        console.error(error)
        console.error('Error creating user tip:', err);
        pool.end();
    }
}

const dropTableTips = async () => {
    const dropTipsQuery = `DROP TABLE IF EXISTS tips);`
    try {
        const res = await pool.query(dropTableTips);
        console.log('User tip deleted');
        pool.end();
    } catch (err) {
        console.error('Error deleting user tip:', err);
        pool.end();
    }
}

/*pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });*/

//export them

 export {
    dropTableTips,
    createUserTable,
    createTableTips
 }
