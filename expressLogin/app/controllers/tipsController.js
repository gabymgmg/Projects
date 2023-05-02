import moment from 'moment';
import { createTableTips } from '../db/dev/dbConnection';

import dbQuery from '../db/dev/dbQuery';

import {
    empty,
} from '../helpers/validations';


import {
    errorMessage, successMessage, status,
} from '../helpers/status';


//add a tip
const addTip = async (req, res) => {
    const {
        user_id, tip_category, tip_content
    } = req.body;
    console.log(req.body)
    const created_on = moment(new Date());

    if (empty(tip_content)) {
        errorMessage.error = 'Tip content can not be empty';
        return res.status(status.bad).send(errorMessage);
    }
    const createTipsQuery = `INSERT INTO
          tips(user_id,tip_category,tip_content, created_on)
          VALUES($1, $2, $3, $4)
          returning *`;
    const values = [
        user_id,
        tip_category,
        tip_content,
        created_on
    ];

    try {
        const createTable = await createTableTips()
        const { rows } = await dbQuery.query(createTipsQuery, values);
        const dbResponse = rows[0];
        delete dbResponse.user_id
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.error(error)
        errorMessage.error = 'Unable to add tip';
        return res.status(status.error).send(errorMessage);
    }
};


const getAllTips = async (req, res) => {
    const { is_admin, user_id } = req.user;
    if (!is_admin === true) {
        const getAllTipsQuery = 'SELECT * FROM tips WHERE user_id = $1';
        try {
            const { rows } = await dbQuery.query(getAllTipsQuery, [user_id]);
            const dbResponse = rows;
            if (dbResponse[0] === undefined) {
                errorMessage.error = 'You have no tips';
                return res.status(status.notfound).send(errorMessage);
            }
            successMessage.data = dbResponse;
            return res.status(status.success).send(successMessage);
        } catch (error) {
            errorMessage.error = 'An error Occured';
            return res.status(status.error).send(errorMessage);
        }
    }
    const getAllTipsQuery = 'SELECT * FROM tips ORDER BY id DESC';
    try {
        const { rows } = await dbQuery.query(getAllTipsQuery);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMessage.error = 'There are no tips';
            return res.status(status.bad).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};
const deleteTip = async (req, res) => {
    const { tip_id } = req.params
    const { user_id } = req.user
    const deleteTipQuery = 'DELETE FROM tips WHERE tip_id=$1 AND user_id = $2 returning *';
    try {
        const { rows } = await dbQuery.query(deleteTipuery, [tip_id, user_id]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'You have no tip with that id';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Tip/s deleted successfully';
        return res.status(status.success).send(successMessage);
    } catch (error) {
        return res.status(status.error).send(error);
    }
};

export {
    addTip,
    deleteTip,
    getAllTips
};

