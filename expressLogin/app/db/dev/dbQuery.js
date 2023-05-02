import pool from './pool';

//here we're using a method instead of a function
//since the query method has to be directly related to the pool obj
//also, we're using export default since it'll be just a number
export default {

  async query(queryText, params) {
    try {
      const result = await pool.query(queryText, params);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
//export the method to make queries