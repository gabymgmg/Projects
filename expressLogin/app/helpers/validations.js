import env from '../../env';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');


///validate email and pwd
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

const generateUserToken = (email,id,is_admin,name) =>{
  const token = jwt.sign({
    email,
    user_id:id,
    is_admin,
    name,
  },
  env.secret, {expiresIn:'2d'});
  return token
}

/*const hashPassword = (password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return callback(err);
    }
    else {
      return hash
    }
  });
}*/ // cual esla diferencia en hacerlo asi o retornar una promesa
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};
export {
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  generateUserToken,
  hashPassword,
  comparePassword
};