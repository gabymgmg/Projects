import moment from 'moment';
import { createUserTable } from '../db/dev/dbConnection';
import dbQuery from '../db/dev/dbQuery';

import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';

const createUser = async (req, res) => {
  const {
    name, email, password
  } = req.body;
  const created_on = moment(new Date());
  if (isEmpty(email) || isEmpty(name) || isEmpty(password)) {
    errorMessage.error = 'Email, password or name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = 'Password must be more than five(5) characters';
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = await hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(name, email, password,created_on)
      VALUES($1, $2, $3, $4)
      returning *;`
  const values = [    name,    email,    hashedPassword,  created_on,  ];

  try {
    const userTable = await createUserTable()
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(dbResponse.name, dbResponse.email, dbResponse.id, dbResponse.is_admin);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.error(error)

    if (error.constraint === 'users_email_key') {
      errorMessage.error = 'User with that email already exists';
      return res.status(status.conflict).send(errorMessage);
    } else {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  }
};


const siginUser = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await dbQuery.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    const token = generateUserToken(dbResponse.name, dbResponse.email, dbResponse.id, dbResponse.is_admin);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.error(error)
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

export {
  createUser,
  siginUser,
};