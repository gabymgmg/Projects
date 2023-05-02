import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
    errorMessage, status,
} from '../helpers/status';
import env from '../../env';
dotenv.config();

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = {
            name: decoded.name,
            email: decoded.email,
            user_id: decoded.user_id,
            is_admin: decoded.is_admin,
        };
        next();
    } catch (error) {
        console.error(error)
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

export default verifyToken;

//nota: send the token in headers rather than in success msg